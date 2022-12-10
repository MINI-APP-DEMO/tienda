import React from 'react'
import ReactDOM from 'react-dom/client'
import '@styles/index.scss'
import { modules } from './constants'
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import "@fontsource/roboto";
import "@fortawesome/fontawesome-free/css/fontawesome.css"
import "@fortawesome/fontawesome-free/css/brands.css"
import "@fortawesome/fontawesome-free/css/solid.css"
import "@fortawesome/fontawesome-free/css/all.css"



window._modules = modules
window._zoneOffset = new Date().getTimezoneOffset()
window._isProd = false
window.baseUrlAPI='http://localhost:5500'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 <RouterProvider router={router} />
)
