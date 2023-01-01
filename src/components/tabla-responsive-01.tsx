import { Component, Fragment, ReactNode } from "react";
import { loadDatatable } from "../libs/datatable";
import { IRowDataParseada, Tabla, TableHeader } from "./tabla";
import './scss/dataTable.scss'
import { SpinnerLoading } from "../core/Notiflix";

interface IPropsTableResponsive1 {
    ctx: Tabla
}
interface IStateTableResponsive1 {
    headers: IRowDataParseada[]
    body: IRowDataParseada[]
}
export class TableResponsive01 extends Component<IPropsTableResponsive1, IStateTableResponsive1>{
    constructor(props: any) {
        super(props);

        this.state = {
            headers: [],
            body: []
        }
    }


    componentDidUpdate(prevProps: Readonly<IPropsTableResponsive1>, prevState: Readonly<IStateTableResponsive1>, snapshot?: any): void {
        const currentPropsParent = this.props.ctx.state
        const prevPropsParent = prevProps.ctx.state
        const prevBodyRows = prevPropsParent.dataParseada.rows.filter(x => x.isBody)
        const currentBodyRows = currentPropsParent.dataParseada.rows.filter(x => x.isBody)
        const headers = currentPropsParent.dataParseada.rows.filter(x => x.isHeaderTable)
        const itemsPrevs = prevBodyRows[0].rowsBody?.length || 0
        const currentItems = this.state.body.length || 0
        if (itemsPrevs != currentItems) {
            this.setState({
                headers: headers,
                body: currentBodyRows[0]?.rowsBody || []
            })


        }

    }
    componentDidMount(): void {
        const parentProps = this.props.ctx.state
        const bodyRows = parentProps.dataParseada.rows.filter(x => x.isBody)
        const headers = parentProps.dataParseada.rows.filter(x => x.isHeaderTable)
        this.setState({
            headers: headers,
            body: bodyRows[0]?.rowsBody || []
        })

        let textContent = ''
        SpinnerLoading.loading('Generando DataTable')
         loadDatatable(true)
        window.addEventListener('load', (eve) => {
            SpinnerLoading.remove()
            loadDatatable()
        });
    }

    render(): ReactNode {
        const state = this.state
        return <Fragment>
            <table className={"w-full table dt-responsive"}>
                <TableHeader columns={state.headers} />
                <tbody>
                    {state.body.map((x, i) => {
                        return <TRow backgroundRow={i % 2 == 1} key={i} row={x} />
                    })}
                </tbody>
            </table>
        </Fragment>
    }
}

interface ITRow {
    row: IRowDataParseada
    backgroundRow: boolean
}
const TRow = (props: ITRow) => {
    const entries = Object.entries(props.row)
    return <tr className={props.backgroundRow ? 'bg-gray-200' : ''}>
        {entries.map(([key, value], index) => {
            return <TCell isControl={index == 0} key={key} keyObject={key} value={value} />
        })}
    </tr>
}

interface IPropTCell {
    keyObject: any
    value: any
    isControl: boolean
}
const TCell = (props: IPropTCell) => {
    return <td className={props.isControl ? 'dtr-control' : ''}>
        <div className="w-max">
            {props.value}</div>
    </td>
}
