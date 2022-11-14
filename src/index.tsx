import "./index.css";

import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";

import App from "./App";
import { CollectionsProvider } from "./context/collections/CollectionsProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CollectionsProvider>
    <CssBaseline />
    <App />
  </CollectionsProvider>
);
