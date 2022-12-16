import { PureComponent, ReactNode } from "react";
import { Breadcrumb, IBreadCrumb } from "./breadcrumb";
import { Card1 } from "./cards";


interface IPropsLayoutPage {
 breadrumb?: IBreadCrumb[]
 children: JSX.Element
 header?: { title?: string, icon?: string, btnAdd?: boolean }
}
interface IStateLayoutPage { }

export class LayoutPage extends PureComponent<IPropsLayoutPage, IStateLayoutPage>{
 constructor(props: IPropsLayoutPage) {
  super(props)
  this.state = {}
 }
 render(): ReactNode {
  return <div className="px-2 pt-2">
   {this.props.breadrumb && <Breadcrumb breadcrumb={this.props.breadrumb || []} removeBackground={false} />}
   <div className="mt-4  ">
    {this.props.header && <div className="flex w-full pl-2 mb-1 justify-between items-center">
     <h1 style={{ fontSize: '15px' }} className={'text-gray-500'}>
      <span className={this.props.header?.icon ? this.props.header?.icon : ""} />&nbsp;
      {this.props.header.title}
     </h1>
     {this.props.header.btnAdd && <button className="bg-app text-white px-6 py-1.5 rounded-2xl" style={{ fontSize: '12px' }}>
      <span className="fa fa-add" style={{ fontSize: '11px' }} /> Nuevo</button>}
    </div>}
    <div className="border-solid rounded p-2 border-gray-300 w-full shadow-md" style={{ borderWidth: '1px' }}> {this.props.children}</div>
   </div>
  </div>
 }
}