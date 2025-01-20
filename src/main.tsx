import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import EggCookingHelper from "./app.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <EggCookingHelper />
    </StrictMode>
);
