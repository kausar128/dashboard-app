import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
// import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { App } from "./App";
import { theme } from "./theme/theme";
import { ApiStateProvider } from "./state/api/ApiStateContext";
import { ApiClientProvider } from "./api/ApiClientProvider";
import { setupMockApi } from "./api/mockApi";
import { GlobalSnackbarProvider } from "./utils/GlobalStackbar";

/** 🔑 AG Grid module registration */
ModuleRegistry.registerModules([AllCommunityModule]);

import apiClient  from "./api/apiClient";

setupMockApi(apiClient);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <GlobalSnackbarProvider>
      <ApiStateProvider>
        <ApiClientProvider>
            <App />
            </ApiClientProvider>
      </ApiStateProvider>
    </GlobalSnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
