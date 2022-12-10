import react,{Fragment} from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface ICard1Props{
  header?:JSX.Element
  children:JSX.Element
  footer?:JSX.Element
  headerClass?:string
  footerClass?:string
  headerCss?:react.CSSProperties
  footerCss?:react.CSSProperties
  styles?:react.CSSProperties
  class?:string
  title?:string
  textFooter?:string

}

export const Card1=(props:ICard1Props):JSX.Element=>{
  return <Fragment>
    <div className={'border border-gray-300 border-solid '+props.class}
         style={props.styles?props.styles:{}}>
      {props?.title &&<div className={'pt-2.5  px-3 '+props.headerClass}  style={props.headerCss?props.headerCss:{}}>
        <h6 className={'font-medium mb-2'}>{props.title||'Header' }</h6>
        <hr className={'mb-0'}/> </div>
      }{ props?.header }
      <div className={'mt-1 p-3'}>
        {props.children}
      </div>

       {props?.textFooter &&<div className={'p-3 text-center '+props.footerClass}  style={props.footerCss?props.footerCss:{}}>
        <h6 className={'font-medium'}>{props?.textFooter||'Footer'}</h6>
        <hr/> </div>
      }{ props?.footer }

    </div>
  </Fragment>
}