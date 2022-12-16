import { Component, ReactNode } from "react";
import { Card1 } from "../../../../components/cards";
import { Container } from "../../../../components/Contenedores";
import { LayoutPage } from "../../../../components/layout-page";
import { IColumnsTabla, Tabla } from "../../../../components/tabla";
import { dataDemo } from '../../../../helpers/data-demo'

export interface IStatePersona{
 data: any[]
 columns: IColumnsTabla[]
}

export class Personas extends Component<any,any> {
 constructor(props: any) {
  super(props)
  this.state = {
   data: dataDemo,
   columns: [
    {_key:'id',label:'ID'},
    { _key:'name',label:'Nombre'},
    { _key:'position',label:'Posicion'},
    { _key:'salary',label:'Salario'},
    { _key:'start_date',label:'Fecha inicio'},
    { _key:'office',label:'Fecha Oficina'},
    { _key:'office',label:'Fecha Oficina'},
    { _key:'office',label:'Fecha Oficina'},
    { _key:'office',label:'Fecha Oficina'},
    { _key:'extn',label:'Extn'}
   ]
  }
 }

 render(): ReactNode {
  const { state }=this
  return <LayoutPage breadrumb={[{ name: 'Home', icon: 'fa fa-home', path: '/', mode: 2 },
   { name: 'Registros', icon: 'bx bx-grid', mode: 3 },
   { name: 'Personas', icon: 'fa fa-users', path: '/registros/personas', disabled: true ,mode:3}]}
   header={{title:'Usuarios',icon:'fa fa-users',btnAdd:true}}
  >			
   <Container>
    <Tabla data={state.data} columns={state.columns} />
   </Container>
  </LayoutPage>
 }

}