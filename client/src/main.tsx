import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store, persistor } from "./store/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./pages/dashboard/theme-provider.tsx";
import router from "./router.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
