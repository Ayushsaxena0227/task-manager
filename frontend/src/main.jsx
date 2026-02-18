import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1a1a2e",
          color: "#e8e4f0",
          border: "1px solid #2d2b55",
          borderRadius: "12px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
        },
        success: {
          iconTheme: { primary: "#a78bfa", secondary: "#1a1a2e" },
        },
        error: {
          iconTheme: { primary: "#f87171", secondary: "#1a1a2e" },
        },
      }}
    />
  </React.StrictMode>,
);
