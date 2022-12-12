import {
 createBrowserRouter,
 BrowserRouter,
 RouterProvider,
 Route,
 Link,
 RouteObject,
 Routes,
} from "react-router-dom";
import '@styles/index.scss'
import { LoginPage } from "../apps/app-administracion/auth/login";
import { Dashboard } from "../apps/app-administracion/views/dashboard";
import { INavegacion, NavegacionApp } from '../_nav'
import { AdaptativoLayout, AppLayout } from "../layouts/app-layout";

const ParseRouter = () => {
 return <Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/" element={<AdaptativoLayout />}>
   <Route path="" element={<Dashboard />} />
  </Route>
 </Routes>
}
const ParseRouterNav = () => {

}


export const Router = () => <BrowserRouter><ParseRouter /></BrowserRouter>