import React from "react";
import ReactDOM from "react-dom/client";
import UserApp from "./UserApp.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";

ReactDOM.createRoot(document.getElementById("user-root")).render(
 <React.StrictMode>
  <UserApp />
 </React.StrictMode>
);
