import { Component, CSSProperties, memo, PureComponent, ReactNode } from "react";

export interface IColumnsTabla {
 _key: string
 label: string
 render?: (value: any, row?: any) => JSX.Element
}

interface IPropsTabla {
 columns: IColumnsTabla[]
 data: any[]
}
interface IStateTabla {
 data: any[]
 columns: IColumnsTabla[]
 dataParseada: IDataParseada
}

interface IDataParseada {
 rows: IRowDataParseada[]
 class?: string
 css?: CSSProperties
}

interface IRowDataParseada {
 class?: string
 cells: IItemDataParseada[]
 css?: CSSProperties
 isBody?: boolean
 isHeaderTable?: boolean
 isFooter?: boolean
}
interface IItemDataParseada {
 _key: string, value: any,
 class?: string
 css?: CSSProperties
 render?: (value: any, row?: any) => JSX.Element
}


export class Tabla extends Component<IPropsTabla, IStateTabla>{
 constructor(props: any) {
  super(props);
  this.state = {
   data: this.props.data,
   columns: this.props.columns,
   dataParseada: {rows:[]} as IDataParseada
  }
 }

 parsearData() {
  const { state } = this
  const { data, columns } = state
  let itemsHeader: IItemDataParseada[] = []
  const rowsDataParsed: IRowDataParseada[] = []
  for (let header of columns) {
   let itemDataParsed: IItemDataParseada = {
    _key: header._key,
    value: header.label,
   }
   itemsHeader.push(itemDataParsed)
  }
  const itemRow: IRowDataParseada = {
   cells: itemsHeader, isHeaderTable: true
  }
  rowsDataParsed.push(itemRow)

  for (let item of data) { }

  const dataParsed: IDataParseada = { rows: rowsDataParsed }
  this.setState({ dataParseada: dataParsed })
 }

 componentDidMount(): void {
  const state = this.state
  console.log('data cargada en tabla ::', state.data)
  this.parsearData()
 }



 render(): ReactNode {
  const state = this.state
  console.log('rows data::', state.dataParseada.rows)
  return <div className="overflow-x-auto"><table className="w-full border-collapse ">
   <TableHeader columns={state.dataParseada.rows.filter(x => x.isHeaderTable)} />
  </table></div>

 }
}

interface IPropsTableHeader {
 columns: IRowDataParseada[]
}
const TableHeader = (props: IPropsTableHeader) => {
 return <thead className={"bg-app rounded-2xl   text-white px-3"} >
  {props.columns.map((header,index) => {
   return <TRowHead row={header} key={index+'row'} />
  })}
 </thead>
}

interface ITRowHead {
 row: IRowDataParseada
}
const TRowHead = (props: ITRowHead) => {
 const { row } = props
 return <tr className={' '+(row.class?row.class:'')} style={row.css}>
  {row.cells.map((x,i) => {
   return <ItemHeadRow cell={x} key={i+'cell'} />
  })}
 </tr>
}

interface IItemHeadRow {
 cell: IItemDataParseada
}
const ItemHeadRow = (props: IItemHeadRow) => {
 return <th className={' py-1.5 px-3 border-2 border-white border-separate rounded-lg '+(props.cell.class?props.cell.class:'')} style={props.cell.css}>
  {props.cell.value}
 </th>
}
