import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OdinCodex — Sistemas de gestión y software a medida",
    short_name: "OdinCodex",
    description:
      "Sistemas de gestión con tu marca para restaurantes, clubes privados y empresas.",
    start_url: "/",
    display: "standalone",
    lang: "es",
    background_color: "#0e1a1c",
    theme_color: "#0e1a1c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
