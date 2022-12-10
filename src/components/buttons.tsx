import React, { CSSProperties, Fragment, MouseEventHandler, MouseEvent } from "react";
interface IButtonProps{
    type?: string
    icon?: string
    text?: string
    class?: string
    style?: CSSProperties
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = React.memo((props: IButtonProps) => {
    
    const handleClick = (e: MouseEvent)=>{ 
        if(props.onClick)props.onClick(e)
    }

    return <Fragment>
        <button className={"border border-gray-300 rounded py-1.5 px-3  hover:bg-blue-700" +
            "hover:text-white active:bg-blue-700 active:text-white focus:outline-none "+
            "focus:ring focus:ring-blue-100" + props.class}
            onClick={(e) => { handleClick(e) } }
            style={props.style} >
            {props.icon && <span className={'lbl-icon-button '+ props.icon}> </span>}
            {props.text || 'button'}
        </button>
    </Fragment>
 })