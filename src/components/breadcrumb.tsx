import { CSSProperties } from "react"

export interface IBreadCrumb {
 icon?: string
 name: string
 path?: string
 mode?: number
 disabled?: boolean
 separator?: string

}
interface IPropBreadcrumb {
 breadcrumb: IBreadCrumb[]
 class?: string
 style?: CSSProperties
 removeBackground?: boolean
}

export const Breadcrumb = (props: IPropBreadcrumb) => {
 return <div className={"w-full py-1.5 pl-2 rounded-lg " +
  (props.removeBackground ? 'text-app' : (props.class ? ' ' + props.class : ' bg-green-500 text-white'))}>
  {props.breadcrumb.map((x, i) => {
   return <ItemBreadcrumb key={i} info={x} isFinal={props.breadcrumb.length - 1 == i ? true : false} />
  })}
 </div>
}

const ItemBreadcrumb = (props: { info: IBreadCrumb, isFinal: boolean }) => {
 return <label className=" inline-flex items-center">
  {((props.info.mode && props.info.mode == 1) || !props.info?.mode) &&
   <><span className="cursor-pointer">{props.info.name}</span>{!props.isFinal && <> &nbsp;<span style={{ fontSize: '11px' }} className="fa fa-chevron-right cursor-pointer"></span>&nbsp;</>} </>
  }
  {props.info.mode && props.info.mode == 2 && <><span className={(props.info.icon) + ' cursor-pointer'}></span>&nbsp;
   {!props.isFinal && <>
    {props.info?.separator ? <><span style={{ fontSize: '11px' }} >{props.info.separator}</span>&nbsp;</> :
     <> <span style={{ fontSize: '11px' }} className="fa fa-chevron-right" />&nbsp;</>
    }
   </>
   }
  </>}
  {props.info.mode && props.info.mode == 3 && <label className="cursor-pointer"><span className={(props.info.icon)+' cursor-pointer'} ></span>&nbsp;{props.info.name}
   {!props.isFinal && <>
    {props.info?.separator ? <><span style={{ fontSize: '11px' }} >{props.info.separator}</span>&nbsp;</> :
     <> <span style={{ fontSize: '11px' }} className="fa fa-chevron-right" />&nbsp;</>
    }
   </>
   }
  </label>}
 </label>
}