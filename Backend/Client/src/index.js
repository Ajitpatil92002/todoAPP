import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import TodoProvider from "./context/TodoContext/Provider";
import { AuthContextProvider } from "./context/authContext/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
