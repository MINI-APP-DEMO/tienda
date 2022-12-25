import { Component, CSSProperties, Fragment, memo, PureComponent, ReactNode } from "react";
import { TableResponsive01 } from "./tabla-responsive-01";
import './scss/tabla.scss'
import { arrayToMap } from "../helpers/parse-data.helper";
import { LengthItems, SearchTable } from "./nro-items-&search";


export const arrayToMapTabla = (data: any[], columns: IColumnsTabla[], groupKey: string) => {
  if (!Array.isArray(data) || !columns.length) return;
  const dataMap = new Map<any, any[]>();
  for (let e of data) {
    for (let keyValue of Object.keys(e)) {
      if (keyValue == groupKey) {
        if (dataMap.has(keyValue)) {
          dataMap.get(keyValue)?.push(e);
        } else {
          dataMap.set(keyValue, [e]);
        }
      }
    }
  }

  return dataMap
};

export const objectToMap = (itemData: object): Map<any, any> => {
  const entriesObject = Object.entries(itemData)
  const mapItem = new Map()
  for (let [entry, value] of entriesObject) {
    mapItem.set(entry, value)
  }
  return mapItem
}


export const arrayToArrayTabla = (data: any[], columns: IColumnsTabla[]) => {
  if (!Array.isArray(data) || !columns.length) return;
  const dataMap: any[] = [];
  for (let e of data) {
    const mapItem = objectToMap(e)
    let rowData = new Set<any>()
    for (let colHeader of columns) {
      let cellData = {
        _key: colHeader._key,
        value: ''
      } as IItemDataParseada

      if (mapItem.has(cellData._key)) {
        cellData.value = mapItem.get(cellData._key)
      }
      rowData.add(cellData)
    }

    let objectRow: any = {}
    for (let values of [...rowData]) {
      objectRow[values._key] = values.value
    }
    dataMap.push(objectRow)
  }

  return dataMap
};

export interface IColumnsTabla {
  _key: string
  label: string
  isLocal?: boolean
  render?: (value: any, row?: any) => JSX.Element
  hiddenSearch?: boolean
  hiddenPaginacion?: boolean
  hiddenlenght?: boolean
}

interface IPropsTabla {
  columns: IColumnsTabla[]
  data: any[]
  class?: string
  responsive01?: boolean
  groupKey?: string //* agrupa los datos de la datatable
}

interface IStateTabla {
  data: any[]
  columns: IColumnsTabla[]
  dataParseada: IDataParseada
  tBodyData: any[]
  groupKey?: string
  tempData: IDataParseada
  lenghtItems: number
  searchTabla: string
  initItem: number
  finItem: number
  currentPage:number
}

interface IDataParseada {
  rows: IRowDataParseada[]
  class?: string
  css?: CSSProperties
}

interface IRowDataParseada {
  class?: string
  cells?: IItemDataParseada[]
  rowsBody?: any[]
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
      groupKey: 'id',
      tBodyData: [],
      tempData:{ rows: [] } as IDataParseada,
      lenghtItems: 10,
      searchTabla: '',
      currentPage: 1,
      finItem: 10,
      initItem:0,
      dataParseada: { rows: [] } as IDataParseada
    }
  }

  parsearData() {
    const { state, props } = this
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
    const mapData = arrayToArrayTabla(data, columns)

    const itemRowBody: IRowDataParseada = {
      rowsBody: mapData, isBody: true
    }
    rowsDataParsed.push(itemRowBody)
    const dataParsed: IDataParseada = { rows: rowsDataParsed }
    this.setState({ dataParseada: dataParsed ,tempData:dataParsed})
  }

  componentDidMount(): void {
    const state = this.state
    this.setState({ groupKey: this.props.groupKey })
    this.parsearData()    
  }

  render(): ReactNode {
    const state = this.state
    console.log('rows data::', state.tempData.rows)
    return <div className="table-component">
      <div className="options-lenght">
        <LengthItems length={state.lenghtItems}
          setLength={(value: number) => {this.setState({lenghtItems:value}) }} />
        <SearchTable search={state.searchTabla} />
      </div>
      <div className="table-content">
        {this.props.responsive01 && <TableResponsive01 ctx={this} />}
        {!this.props.responsive01 &&
          <table className={"w-full table " + (this.props.class)}>
            <TableHeader columns={state.dataParseada.rows.filter(x => x.isHeaderTable)} />
            <TBody columns={() => {
              const rows = state.tempData.rows.filter(x => x.isBody)
              return rows
            }  }/>
          </table>
        }
      </div>
    </div>
  }
}

interface ITbodyProps {
  columns:()=>IRowDataParseada[]| IRowDataParseada[]
}
const TBody = (props: ITbodyProps) => {
  let rows: IRowDataParseada[] = []
  if (Array.isArray(props.columns)) {
    rows=props.columns
  }
  if (typeof props.columns == 'function') {
    rows=props.columns()
  }
  const rowBody=  rows.length ? rows[0].rowsBody||[]:[] 
  return <tbody>
    {rowBody.map((row, i) => {
      return <TRow row={row} key={i + 'row'} />
    })}
  </tbody>
}


interface IPropsTD {
  row: Object
}
const TRow = (props: IPropsTD) => {
  return <tr>
    {Object.entries(props.row).map((x, i) => {
      return <td key={i + 'td'}>
        {x[1]}
      </td>
    })}
  </tr>
}

interface IPropsTableHeader {
  columns: IRowDataParseada[]
}
const TableHeader = (props: IPropsTableHeader) => {
  return <thead className={""} >
    {props.columns.map((header, index) => {
      return <TRowHead row={header} key={index + 'row'} />
    })}
  </thead>
}

interface ITRowHead {
  row: IRowDataParseada
}
const TRowHead = (props: ITRowHead) => {
  const { row } = props
  return <tr className={' ' + (row.class ? row.class : '')} style={row.css}>
    {[...row.cells || []].map((x, i) => {
      return <ItemHeadRow cell={x} key={i + 'cell'} />
    })}
  </tr>
}

interface IItemHeadRow {
  cell: IItemDataParseada
}
const ItemHeadRow = (props: IItemHeadRow) => {
  return <th className={'  ' + (props.cell.class ? props.cell.class : '')} style={props.cell.css}>
    {props.cell.value}
  </th>
}
