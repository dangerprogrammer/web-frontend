import { Dispatch, ReactNode, SetStateAction } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import './input-box.scss';

export function InputBox({
    placeholder,
    options,
    id,
    isPassword,
    confirmPassword,
    visiblePassword,
    setVisible,
    change,
    formChange
}: {
    placeholder: string,
    options?: { value: string, text: string }[],
    LabelIcon?: ReactNode,
    id: string,
    isPassword?: boolean,
    confirmPassword?: boolean,
    visiblePassword?: boolean,
    setVisible?: Dispatch<SetStateAction<any>>,
    change: string,
    formChange: Dispatch<SetStateAction<any>>
}) {
    return <article className='input-box'>
        {options ? <select onChange={ev =>
            formChange((prev: any) => ({ ...prev, [change]: ev.target.value }))
        }>
            {<option value={0} defaultChecked>{placeholder}</option>}
            {options.map((opt, i) => <option key={i} value={opt.value}>{opt.text}</option>)}
        </select> : <>
            <input id={id} required placeholder={placeholder}
                type={isPassword ? (visiblePassword ? 'text' : 'password') : 'text'} onChange={ev =>
                    formChange((prev: any) => ({ ...prev, [change]: ev.target.value }))
                } />
            {(isPassword && !confirmPassword) ? <span className='toggle-password' onClick={() => setVisible!(!visiblePassword)}>
                {visiblePassword ? <IoEyeOff /> : <IoEye />}
            </span> : undefined}
        </>}
    </article>
}