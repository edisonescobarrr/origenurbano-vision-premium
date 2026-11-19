import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/inter";
import "./index.css";

const container = document.getElementById("root")!;

// Las páginas pregeneradas ya traen su HTML: React solo lo conecta en vez de volver a dibujarlo
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
