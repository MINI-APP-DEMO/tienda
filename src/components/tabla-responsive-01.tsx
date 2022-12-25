import { Component, ReactNode } from "react";
import { Tabla } from "./tabla";

interface IPropsTableResponsive1{
 ctx: Tabla
}
export class TableResponsive01 extends Component<IPropsTableResponsive1, any>{
 constructor(props:any) {
  super(props);
  this.state={}
 }
 render(): ReactNode {
     return <></>
 }
}