import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
// import store from "./store.js";
import store_async from "./store_async.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Provider store={store}> */}
    <Provider store={store_async}>
      <App />
    </Provider>
  </StrictMode>,
);
