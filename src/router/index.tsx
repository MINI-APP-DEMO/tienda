import {
 createBrowserRouter,
 BrowserRouter,
 RouterProvider,
 Route,
 Link,
} from "react-router-dom";
import '@styles/index.scss'
import {LoginPage} from "../apps/app-administracion/auth/login";



export const router = createBrowserRouter([
 {
  path: "/",
  element:<LoginPage/>,
 },
 {
  path: "about",
  element: <div>About</div>,
 },
]);