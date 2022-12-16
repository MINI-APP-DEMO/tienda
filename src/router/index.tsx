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
import { Usuarios } from "../apps/app-administracion/views/registros/usuarios";
import { Personas } from "../apps/app-administracion/views/registros/personas";

const ParseRouter = () => {
 return <Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/registros" element={<AdaptativoLayout />}>
   <Route path="usuarios" element={<Usuarios />} />
   <Route path="personas" element={<Personas />} />
  </Route>
  <Route path="/" element={<AdaptativoLayout />}>
   <Route path="" element={<Usuarios />} />
  </Route>
 </Routes>
}
export const Router = () => <BrowserRouter><ParseRouter /></BrowserRouter>