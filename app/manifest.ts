import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ArmanixVerse",
    short_name: "Armanix",
    description: "The Ultimate Gaming Universe",
    start_url: "/",
    display: "standalone",
    background_color: "#050508",
    theme_color: "#8b5cf6",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
