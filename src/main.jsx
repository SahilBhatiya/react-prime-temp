import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "primereact/resources/primereact.min.css";
import "/src/core/styles/themes/mytheme/theme.scss";
import "/src/core/styles/_base.scss";
import "/src/core/styles/_transitions.scss";
import "/src/core/styles/themes/bootstrap/scss/bootstrap.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
