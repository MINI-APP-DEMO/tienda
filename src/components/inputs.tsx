import react, { CSSProperties, Fragment, HTMLInputTypeAttribute, useState } from "react";
import './scss/inputs.scss'
interface IInputProps {
    label: string
    labelClass?: string
    inputClass?: string
    inputCss?: react.CSSProperties
    placeholder?: string
    type?: HTMLInputTypeAttribute
    icon?: string
    class?: string
    style?: CSSProperties
    saveForm: any
    itemForm: string
    onBlur?: (value: string | number) => any

}

export const Input = react.memo((props: IInputProps) => {

    const [formSave, setFormSave] = useState(props.saveForm || {})

    const handleOnBlur = (e:any) => {
        const value = e.target.value
        const form:any = formSave
        form[props.itemForm] = value
        setFormSave(form)
        if (props.onBlur) props.onBlur(value)
     }

    return <Fragment>
        <div className={'flex w-full align-center items-center mb-3 ' + props.class}
            style={props?.style ? props?.style : {}}>
            {props.label && !props.icon &&
                <><label className={'font-light ' + props.labelClass}>{props.label}</label> &nbsp;&nbsp;</>}
            {props.icon && <div className={'relative w-full'}>
                <span className={'absolute top-2.5 left-2 ' + props.icon}></span>
                <input className={'w-full rounded border-gray-300 ' + props.inputClass}
                    style={{ ...props.inputCss, padding: '0.45rem', paddingLeft: '1.6rem' }} placeholder={props.placeholder}
                    type={props.type || 'text'}
                    onBlur={(e) => handleOnBlur(e)}
                />
            </div>
            }
            {!props.icon && <input className={'w-full rounded ' + props.inputClass}
                style={{ ...props.inputCss, padding: '0.45rem' }} placeholder={props.placeholder}
                type={props.type || 'text'} />}

        </div>
    </Fragment>
})


export const InputSearch = react.memo((props:any) => {
    return <input className="search-input border border-solid border-gray-600 pl-2"
        placeholder="Buscar"></input>
})