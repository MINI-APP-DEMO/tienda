import { Fragment } from "react"
import { IRowDataParseada, Tabla } from "./tabla"
interface IPropsPaginacion {
    length: number
    data: IRowDataParseada[],
    ctx: Tabla
}
export const Paginacion = (props: IPropsPaginacion) => {
    const totalData = props.ctx.state.data.length
    const lenght = props.ctx.state.lengthItems
    const totalPaginas = Math.ceil(totalData / lenght)
    const currentPage = props.ctx.state.currentPage
    const prevCurrentPage = props.ctx.state.prevCurrentPage
    let itemPagTotal = []
    let itemsPageShow = []
    let prevs = 5
    let nexts = 5
    const variacionDiff = 4
    for (let i = 1; i <= totalPaginas; i++) {
        itemPagTotal.push(i)
    }
    const itemsAmostrar = 10
    let initPage = 1
    if (currentPage <= prevs) {
        initPage = 0
    } else if (currentPage > prevCurrentPage) {
        const diffAnt = currentPage - prevCurrentPage
        if (diffAnt > variacionDiff) {
            initPage = diffAnt - variacionDiff
        } else {
            initPage = diffAnt
        }
    }
    initPage = currentPage > 10 ? currentPage - initPage : initPage
    console.info('init page::',initPage)
    const diffIni = initPage
    let diffFin = itemsAmostrar + initPage
    diffFin=diffFin<totalPaginas?diffFin:totalPaginas
    console.info('fin dato::',diffFin)
    for (let j = diffIni; j < diffFin; j++) {
        const page = itemPagTotal[j]
        itemsPageShow.push(page)
    }
    return <div className="paginacion flex w-full mt-3 ">
        <div className="info-label ">
            <label className="text-gray-600 items-center block w-full">Mostrando {props.ctx.state.initItem + 1} a {props.ctx.state.finItem} de
                &nbsp;{props.ctx.props.data.length} Entradas</label>
        </div>
        <div className="items-paginas  ">
            <ul className="flex justify-center w-full">
                {itemsPageShow.map(x => {
                    return <li onClick={(e) => {
                        props.ctx.setState({ prevCurrentPage: currentPage, currentPage: x, })
                    }} className={"flex items-center justify-center rounded-full mx-0.5 w-7 h-7" +
                        "cursor-pointer bg-app hover:bg-slate-400 hover:cursor-pointer text-white active:bg-green-500"
                        + (x == props.ctx.state.currentPage ? ' bg-green-500' : '')}>{x}</li>
                })}
            </ul>
        </div>
    </div>
}
interface IPropsTextPaginacion {
    ctx: Tabla
}
export const TextPaginacion = (props: IPropsTextPaginacion) => {
    return <Fragment></Fragment>
}