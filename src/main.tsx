/**
 * Entry point for the Rhythmo React application.
 *
 * - Wraps the app in React StrictMode for highlighting potential problems.
 * - Uses BrowserRouter for client-side routing.
 * - Wraps the app in a custom Provider for global UI state (e.g., Chakra UI theme).
 * - Renders the main App component.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { Provider } from "./components/ui/provider.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
