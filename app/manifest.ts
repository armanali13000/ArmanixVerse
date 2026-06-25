import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ArmanixVerse",
    short_name: "Armanix",
    description: "The Ultimate Gaming Universe",
    start_url: "/",
    display: "standalone",
    background_color: "#090909",
    theme_color: "#FF4FA2",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
