import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store } from "../redux/store";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";

export function renderWithProviders(ui: React.ReactElement, options = {}) {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </Provider>,
    options
  );
}
