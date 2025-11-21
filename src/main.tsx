// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import appRouter from "./config/route";
// import { Toaster } from "sonner";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";


// const routes = createBrowserRouter(appRouter());

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={routes} />
//       <Toaster richColors position="top-right" />
//     </Provider>
//   </StrictMode>
// );


import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appRouter from "./config/route";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./page-loader";

const routes = createBrowserRouter(appRouter());

export const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster richColors position="top-right" />
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  </StrictMode>
);
