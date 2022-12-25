import { ChangeEvent, Component, Fragment, ReactNode } from "react";


interface itemOption{
 id: any
 name: string | number
}

interface IStateSelect{
 listOptions: itemOption[]
 itemSelected: itemOption
}
interface IPropSelect{
 options: () => itemOption[]| itemOption[]
 onChange?:(ev:itemOption)=>void
}

export class Select extends Component<IPropSelect, IStateSelect>{
 constructor(props: IPropSelect) {
  super(props)
  const optionList = props.options
  let list:itemOption[] = []
  if (Array.isArray(optionList)) {
   list=optionList
  }
  if (typeof optionList == 'function') {
   list=optionList()
  }
  this.state = {
   listOptions: list,
   itemSelected:{} as itemOption
  }
 }

 handleChange(e:ChangeEvent<HTMLSelectElement>) {
  const target = e.target
  const props=this.props
  const value = target.value
  const list = this.state.listOptions
  let item:itemOption={id:-1,name:'Seleccione'}
  const find = list.find(x => x.id == value)
  if (find) item = find
  this.setState({itemSelected:item})
  if(props.onChange) props.onChange(item)
 }

 render(): ReactNode {
  const state=this.state
  return <select className="py-0.5" onChange={(e) => {this.handleChange(e)}}>
   {state.listOptions.map(item => {
    return <option value={item.id}>{item.name}</option>
   })}
  </select>
 }
}