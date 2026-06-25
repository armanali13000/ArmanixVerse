"use client";

import { useEffect, useRef } from "react";

export function HeroField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup = false;
    let dispose = () => {};

    async function boot() {
      const THREE = await import("three");
      if (!mountRef.current || cleanup) return;

      const mount = mountRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const positions = new Float32Array(420 * 3);
      for (let index = 0; index < positions.length; index += 3) {
        positions[index] = (Math.random() - 0.5) * 18;
        positions[index + 1] = (Math.random() - 0.5) * 10;
        positions[index + 2] = (Math.random() - 0.5) * 8;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: "#8b5cf6", size: 0.035, transparent: true, opacity: 0.88 });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const resize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", resize);

      let frame = 0;
      const animate = () => {
        frame = window.requestAnimationFrame(animate);
        points.rotation.y += 0.0009;
        points.rotation.x = Math.sin(Date.now() * 0.00018) * 0.04;
        renderer.render(scene, camera);
      };
      animate();

      dispose = () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    void boot();
    return () => {
      cleanup = true;
      dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10 opacity-80" aria-hidden />;
}
