import { Dispatch, MouseEvent, SetStateAction } from "react";

export function submitProduct(ev: MouseEvent, formContent: any, initialFormContent: any, setErrorMsg: Dispatch<SetStateAction<any>>) {
    ev.preventDefault();
}