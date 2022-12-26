//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./component/Context.jsx";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import App from "./App.js";

//render your react application
ReactDOM.render(
        <AppProvider>
            <App /> 
        </AppProvider>,
document.querySelector("#app"));
