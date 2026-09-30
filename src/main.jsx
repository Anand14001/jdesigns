import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "./index.css";
import { BASENAME } from "./lib/paths";

// The icon links are relative ("./favicon-48.png"). Pin them to their full address now,
// so they keep working when the address changes between pages (e.g. /contact/).
document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]').forEach((link) => link.setAttribute("href", link.href));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={BASENAME}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
