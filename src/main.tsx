import React from 'react'
import ReactDOM from 'react-dom/client'
import '@styles/index.scss'
import { modules } from './constants'
import {RouterProvider} from "react-router-dom";
import { Router } from "./router";
import "@fontsource/roboto";
import "@fortawesome/fontawesome-free/css/fontawesome.css"
import "@fortawesome/fontawesome-free/css/brands.css"
import "@fortawesome/fontawesome-free/css/solid.css"
import "@fortawesome/fontawesome-free/css/all.css"
import "boxicons/css/boxicons.css"


window._modules = modules
window._zoneOffset = new Date().getTimezoneOffset()
window._isProd = false
window.baseUrlAPI='http://localhost:3000'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 <Router />
)
