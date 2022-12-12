import { Component, PureComponent } from 'react';
import { LoginPage } from './apps/app-administracion/auth/login';
import { Dashboard } from './apps/app-administracion/views/dashboard';
import { AppLayout } from './layouts/app-layout';
export interface INavegacion {
 path: string,
 name?: string,
 exact?: boolean
 icon?: string
 iconSize?: string
 background?: string
 textColor?: string
 orden?: number
 modulo?:string
 children?: INavegacion[]
}
export const NavegacionApp: Array<INavegacion> = [
 { path: '/login', name: 'Login', exact: true, icon: 'fa fa-user-alt',iconSize:'16px' },
 {
  path: '/registros', name: 'Registros', exact: true, icon: 'bx bx-grid',iconSize: '16px',
  children: [
   { path: '/usuarios', name: 'Usuarios', exact: true, icon: 'fa fa-users' },
   { path: '/personas', name: 'Personas', exact: true, icon: 'fa fa-users' },
  ]
 }
]
