import type { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";
import { ClientChrome } from "@/components/ClientChrome";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`
  },
  description:
    "A premium independent gaming companion platform for guides, walkthroughs, checklists, trackers, news, community, and AI-powered game help.",
  keywords: ["gaming guides", "GTA VI companion", "game tracker", "walkthroughs", "ArmanixVerse"],
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: "Discover games, track progress, compare gear, read guides, and join the community.",
    url: site.url,
    siteName: site.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: "The ultimate premium gaming companion universe."
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClientChrome>
            <Nav />
            <main>{children}</main>
            <Footer />
          </ClientChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
