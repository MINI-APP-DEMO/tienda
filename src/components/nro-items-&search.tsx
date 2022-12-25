import { ChangeEvent, Component, Fragment, ReactNode } from "react";
import { Input, InputSearch } from "./inputs";
import { Select } from "./Selects";


interface IPropsLengthItems {
 length: number
 setLength:(value:number)=>void
}

interface IStateLengthItems {
 length: number
 listNumbers: { id: number, name: string | number }[]
}

export class LengthItems extends Component<IPropsLengthItems,
 IStateLengthItems>{
 constructor(props: IPropsLengthItems) {
  super(props)
  this.state = {
   length: props.length,
   listNumbers: [
    { id: 10, name: 10 },
    { id: 25, name: 25 },
    { id: 50, name: 50 },
    { id: 100, name: 100 },
    { id: -100, name: 'all' }
   ]
  }
 }

 render(): ReactNode {
  const state=this.state
  return <Fragment>
   <div className="pb-1">
    <label>
     Mostrar&nbsp;<Select options={() => { return state.listNumbers }}
      onChange={({ id, name }) => {
       if(this.props.setLength)this.props.setLength(id)
       this.setState({ length: id })
      }} />&nbsp;
     Entradas
    </label>
   </div>
  </Fragment>
 }
}


export class SearchTable extends Component<any, any>{
 constructor(props: any) {
  super(props)
  this.state = {

  }
 }
 render(): ReactNode {
  return <Fragment>
   <div className="">
    <label>Buscar&nbsp;:&nbsp;</label>
    <InputSearch />
   </div>
  </Fragment>
 }
}