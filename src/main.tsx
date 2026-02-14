import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

// 🔥 AUTO LOGOUT SETIAP PREVIEW (DEV ONLY)
if (import.meta.env.DEV) {
  localStorage.removeItem("auth");
  localStorage.removeItem("email");
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
