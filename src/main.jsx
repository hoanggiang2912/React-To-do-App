import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { TaskProvider } from "./contexts/taskContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </NextUIProvider>
  </StrictMode>
);
