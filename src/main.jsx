import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/fondoGlobal.css"; // ✅ Tu CSS global
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

