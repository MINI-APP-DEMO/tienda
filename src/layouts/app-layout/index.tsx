import react, { Fragment, PureComponent, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import './app-layout.scss'
import ResizeObserver, { withResizeDetector } from 'react-resize-detector';
import { INavegacion, NavegacionApp } from '../../_nav'
//@ts-ignore
import * as ScreenSizeDetector from 'screen-size-detector';

export const IconMenu = (props: IPropsSidebar) => {
  return <a style={{ borderRadius: '3px' }} onClick={() => {
    props.ctx.setState({
      hideSidebar: !props.ctx.state.hideSidebar})
  }}
    className="rounded border-solid cursor-pointer hover:bg-sky-800 hover:text-white
 active:bg-sky-800 active:text-white shadow shadow-gray-00 border-gray-200 bg-white p-3">
    <span className="fa fa-bars lbl-menu lbl-menu cursor-pointer "></span></a>
}

interface IPropsUsuarioNav { username: string }
const UsuarioNav = (props: IPropsUsuarioNav) => {
  const [activeMenu, setActiveMenu] = useState(false)
  return <div className="relative ">
    <a onClick={() => { setActiveMenu(!activeMenu) }} className={"flex items-center cursor-pointer  mr-1 hover:shadow-sm "}>
      <img className="profile-img h-10 rounded-3xl border-solid cursor-pointer" src="/images/descarga.jpeg"></img>
      <label className="lbl-profile px-2 cursor-pointer">{props.username}</label>
    </a>
    <div className={(activeMenu ? 'active ' : '') + "absolute card-items-profile top-10 rounded-sm shadow-md right-0 w-full block bg-white border-stone-500"}>
      <div className="text-right px-2 item-link pt-2 pb-2 border-b">
        <Link to={'/perfil'}>Perfil <span className="fa fa-user-alt"></span></Link>
      </div>
      <div className="text-right item-link px-2 pt-2 pb-2 border-b">
        <Link to={'/perfil'}>Cerrar Sesion <span className="fa fa-sign-out"></span></Link>
      </div>
    </div>
  </div>

}
const MessageNotificaction = () => {
  const [activeMenu, setActiveMenu] = useState(false)
  return <div className="relative">
    <a onClick={() => { setActiveMenu(!activeMenu) }} className={"flex items-center cursor-pointer  mr-1 hover:shadow-sm "}>
      <label className="px-2 cursor-pointer flex items-center">
        <span style={{ fontSize: '20px' }} className="bx bx-envelope"></span>
        <span style={{ fontSize: '9px', top: '-5px', right: '5px' }}
          className="rounded-lg bg-green-500 text-white absolute p-0.5 px-1">10</span>
      </label>
    </a>
    <div className={(activeMenu ? 'active ' : '') + "absolute card-items-profile top-10 rounded-sm shadow-md " +
      "right-0  block bg-white border-stone-500 "} style={{ minWidth: '200px' }}>
      <div className="text-right px-2 item-link pt-2 pb-2 border-b">
        <Link to={'/perfil'}>Perfil <span className="fa fa-user-alt"></span></Link>
      </div>
      <div className="text-right item-link px-2 pt-2 pb-2 border-b">
        <Link to={'/perfil'}>Cerrar Sesion <span className="fa fa-sign-out"></span></Link>
      </div>
    </div>
  </div>
}
interface IPropsSidebar { ctx: AppLayout }
const SidebarRight = (props: IPropsSidebar) => {
  return <Fragment>
    <header className="flex height-header w-full shadow shadow-white">
      <div className="flex items-center justify-between w-full h-full">
        <h3 className="text-white text-center w-full  ">
          <span style={{ fontSize: '20px' }} className="icon-logo bx bx-bar-chart-alt-2"></span>
          <span className='title'>&nbsp;&nbsp;MINIMARKET</span>
        </h3>
      </div>
    </header>
    <div className="content">
      <div className="info-usuario">
        <div className={(props.ctx.state.hideSidebar ? 'hidden' : 'flex') + " items-center p-4 gap-3"}>
          <img className="profile-img h-14  border-solid cursor-pointer" style={{ borderWidth: '2px', borderColor: '#ddd', borderRadius: '50%' }}
            src="/images/descarga.jpeg"></img>
          <div className="informacion-usuario flex-wrap">
            <span className="block text-white mb-0 pb-0" style={{ width: '9px' }}>Bienvenido,</span>
            <label className="block text-white">{props.ctx.state.username}</label>
          </div>

        </div>
      </div>
      <span className="text-general text-white uppercase px-4 font-bold"
        style={{ fontSize: '11px' }}>GENERAL</span>
      <div className="navegacion pt-2">
        <ul className="content-menu">
          {
            NavegacionApp.map((item, index) => {
              if (!item.children?.length) return <Submenu1 informacion={item} key={index} />
              else return <Submenu2 informacion={item} key={index} />
            })
          }
        </ul>
      </div>
    </div>
  </Fragment>
}

interface IMenuNav {
  informacion: INavegacion
}

export const Submenu1 = (props: IMenuNav) => {
  return <li className="menu-item menu1">
    <Link className="" to={props.informacion.path}><span className={props.informacion.icon} style={{ fontSize: props.informacion.iconSize }}></span>
      <label className="text-route">{props.informacion.name}</label></Link>
  </li>
}

export const Submenu2 = (props: IMenuNav) => {
  const [activeSubmenu, setActiveSubmenu] = useState(false)

  return <li className={"menu-item menu2 " + (activeSubmenu ? 'active' : '')}>
    <a className="" onClick={() => { setActiveSubmenu(!activeSubmenu) }}><span className={props.informacion.icon || ''}
      style={{ fontSize: props.informacion.iconSize }}></span><label className="text-route">{props.informacion.name}</label></a>
    <ul className={"menu2-children  " + (activeSubmenu ? 'active' : '')}>
      {props.informacion.children?.map((item, key2) => {
        let router = ''
        if ((!props.informacion.path.trim().length || props.informacion.path.trim().localeCompare('/')==0)
          && (!item.path.trim().length || item.path.trim().localeCompare('/') == 0)) router = '/'
        else router = props.informacion.path.trim()+item.path
        return <li key={'sub' + key2}><Link className="" to={router}><span  className={item.icon+' text-icon'} style={{ fontSize: item.iconSize || '13px' }}></span>
          <label className="text-route">{item.name}</label></Link></li>
      })}

    </ul>
  </li>
}

interface IHeaderNavegacion {
  ctx: AppLayout
}
export const HeaderNavegacion = (props: IHeaderNavegacion) => {
  return <div className="flex items-center gap-x-1">
    <MessageNotificaction />
    <UsuarioNav username={props.ctx.state.username} />

  </div>
}

interface IStateApplayout {
  username: string
  navegacion?: any[]
  hideSidebar: boolean
  tipoSidebar?: 'Default' | 'sm' | 'hidden'
  clickHidden:boolean
  width?: number
  height?: number
  setDefaultResize:number

}
interface IPropApplayout { }

export class AppLayout extends PureComponent<any, IStateApplayout>{
  constructor(props: any) {
    super(props)
    this.state = {
      hideSidebar: false,
      username: 'Jonathan Amaranto',
      tipoSidebar: 'hidden',
      setDefaultResize: 0,
      clickHidden:false
    }
  }
  componentDidUpdate(prevProps: any, prevState: any) {
    const screen = new ScreenSizeDetector(); // same as const screen = new ScreenSizeDetector(); since the above are the default options.
    if (screen.height != prevState.height) {
        this.setState({
          setDefaultResize: 0,
          height: screen.height,
        
        })
    }
  }

  


  render() {
    
    // Use it like so:
    const state = this.state
    const {hideSidebar,setDefaultResize,tipoSidebar,clickHidden }=state
    let stylesTamanioPantalla = ''
    const classNameTipoSidebar = ' tipo-sidebar-' + tipoSidebar 
    let classNameMostarOcultar = hideSidebar?'sidebar-hidden':'sidebar-show'
    return <div className={"app p-0 m-0 flex gap-1 " + classNameMostarOcultar}
      // style={{ height: 'calc(100vh + ' + state.height + 'px)' }}
    >
      <div className={"sidebar bg-app" }>
        <SidebarRight ctx={this} />
      </div>
      <div className="content  height-header ">
        <header className="bg-header flex height-header px-3 shadow shadow-gray-300">
          <div className="flex justify-between w-full items-center h-full">
            <a className=""><IconMenu ctx={this} /></a>
            <HeaderNavegacion ctx={this} />
          </div>
        </header>
        <div className="body px-3 py-2">
          <Outlet />
        </div>
      </div>
    </div>
  }
}

const AdaptiveWithDetector = withResizeDetector(AppLayout);

export const AdaptativoLayout = () => {
  return (
    <AdaptiveWithDetector />
  );
};