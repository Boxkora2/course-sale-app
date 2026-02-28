import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             "NexLearn",
    short_name:       "NexLearn",
    description:      "The future of learning. 200+ courses in Web Dev, Data Science, ML, Design and more.",
    start_url:        "/",
    display:          "standalone",
    background_color: "#0f0a1e",
    theme_color:      "#7c3aed",
    orientation:      "portrait-primary",
    icons: [
      { src: "/icon.svg",    sizes: "any",   type: "image/svg+xml", purpose: "any" },
      { src: "/icon.svg",    sizes: "any",   type: "image/svg+xml", purpose: "maskable" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
