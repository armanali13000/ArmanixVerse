import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirebaseServices, hasFirebaseConfig } from "@/lib/firebase";

type WithId = { id?: string; createdAt?: string; updatedAt?: string; status?: string };

function localKey(name: string) {
  return `av-db-${name}`;
}

export function makeId(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function listRecords<T extends WithId>(name: string, defaults: T[] = []) {
  if (hasFirebaseConfig()) {
    const { db } = getFirebaseServices();
    const snapshot = await getDocs(query(collection(db, name), orderBy("createdAt", "desc")));
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as T[];
  }

  const raw = window.localStorage.getItem(localKey(name));
  if (!raw) {
    window.localStorage.setItem(localKey(name), JSON.stringify(defaults));
    return defaults;
  }
  return JSON.parse(raw) as T[];
}

export async function saveRecord<T extends WithId>(name: string, record: T) {
  const timestamp = new Date().toISOString();
  const next = {
    ...record,
    id: record.id ?? makeId(name),
    createdAt: record.createdAt ?? timestamp,
    updatedAt: timestamp,
    status: record.status ?? "published"
  } as T;

  if (hasFirebaseConfig()) {
    const { db } = getFirebaseServices();
    if (record.id) {
      await setDoc(doc(db, name, record.id), next, { merge: true });
    } else {
      const created = await addDoc(collection(db, name), next);
      next.id = created.id;
    }
    return next;
  }

  const records = await listRecords<T>(name);
  const index = records.findIndex((item) => item.id === next.id);
  const updated = index >= 0 ? records.map((item) => (item.id === next.id ? next : item)) : [next, ...records];
  window.localStorage.setItem(localKey(name), JSON.stringify(updated));
  return next;
}

export async function deleteRecord(name: string, id: string) {
  if (hasFirebaseConfig()) {
    const { db } = getFirebaseServices();
    await deleteDoc(doc(db, name, id));
    return;
  }
  const records = await listRecords(name);
  window.localStorage.setItem(localKey(name), JSON.stringify(records.filter((item) => item.id !== id)));
}

export async function patchRecord<T extends WithId>(name: string, id: string, patch: Partial<T>) {
  const updatedAt = new Date().toISOString();
  if (hasFirebaseConfig()) {
    const { db } = getFirebaseServices();
    await updateDoc(doc(db, name, id), { ...patch, updatedAt });
    return;
  }
  const records = await listRecords<T>(name);
  window.localStorage.setItem(
    localKey(name),
    JSON.stringify(records.map((item) => (item.id === id ? { ...item, ...patch, updatedAt } : item)))
  );
}

export async function uploadMedia(file: File, alt: string) {
  const id = makeId("media");
  if (hasFirebaseConfig()) {
    const { storage } = getFirebaseServices();
    const path = `media/${id}-${file.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file, { customMetadata: { alt } });
    return { id, url: await getDownloadURL(storageRef), path, alt };
  }

  const url = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  const media = { id, url, path: id, alt };
  const records = await listRecords("media");
  window.localStorage.setItem(localKey("media"), JSON.stringify([media, ...records]));
  return media;
}

export async function deleteMedia(path: string, id: string) {
  if (hasFirebaseConfig()) {
    const { storage } = getFirebaseServices();
    await deleteObject(ref(storage, path));
  }
  await deleteRecord("media", id);
}
