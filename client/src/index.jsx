import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import "./styles.css";
// import "./styles.scss";
import "tailwindcss/tailwind.css";
// import {NextUIProvider} from "@nextui-org/react";

const mountNode = document.getElementById("root");
createRoot(mountNode).render(<App/>);