import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0a1e 0%, #1a0a2e 50%, #0e1a3a 100%)",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        },
      },
      // Glow blobs
      React.createElement("div", {
        style: {
          position: "absolute",
          top: "-160px",
          left: "-160px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
        },
      }),
      React.createElement("div", {
        style: {
          position: "absolute",
          bottom: "-160px",
          right: "-160px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)",
        },
      }),
      // Badge
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(124,58,237,0.5)",
            borderRadius: "999px",
            padding: "10px 24px",
            marginBottom: "32px",
          },
        },
        React.createElement("div", {
          style: {
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#06b6d4",
          },
        }),
        React.createElement(
          "span",
          { style: { color: "#a78bfa", fontSize: "20px", fontWeight: 600 } },
          "The Future of Learning"
        )
      ),
      // Brand name
      React.createElement(
        "div",
        {
          style: {
            fontSize: "88px",
            fontWeight: "900",
            background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            letterSpacing: "-3px",
            lineHeight: 1,
            marginBottom: "20px",
          },
        },
        "NexLearn"
      ),
      // Tagline
      React.createElement(
        "div",
        {
          style: {
            fontSize: "28px",
            color: "rgba(226,232,240,0.75)",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.4,
          },
        },
        "200+ cutting-edge courses taught by world-class instructors"
      ),
      // Domain
      React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            bottom: "36px",
            right: "48px",
            fontSize: "22px",
            color: "rgba(148,163,184,0.5)",
          },
        },
        "nexlearn.dev"
      )
    ),
    { width: 1200, height: 630 }
  );
}
