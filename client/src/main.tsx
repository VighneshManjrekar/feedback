import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "./components/ui/toaster.tsx";
import "./index.css";
import { ThemeProvider } from "./pages/dashboard/theme-provider.tsx";
import router from "./router.tsx";
import { persistor, store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
