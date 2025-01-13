import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import EggCookingHelper from "./eggCookingHelper.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <EggCookingHelper />
    </StrictMode>
);
