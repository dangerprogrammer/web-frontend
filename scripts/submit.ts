import { Dispatch, MouseEvent, SetStateAction } from "react";

export async function submitUser(ev: MouseEvent, formContent: any, initialFormContent: any, setErrorMsg: Dispatch<SetStateAction<any>>) {
    const formKeys = Object.keys(formContent);

    for (let key of formKeys) if (formContent[key] == initialFormContent[key]) return setErrorMsg('Preencha todos os campos!');
    ev.preventDefault();

    if ((formHas('password') && formHas('confirmPassword')) &&
        formContent['password'] != formContent['confirmPassword']) return setErrorMsg('As senhas não coincidem!');

    setErrorMsg(undefined);

    const createUserPayload = {
        name: formContent.name,
        email: formContent.email,
        password: formContent.password,
        location: formContent.location,
        userType: formContent.iAm,
        phone: formContent.phone
    };

    const res = await fetch("http://localhost:3000/sign-up", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createUserPayload)
    });
    const user = await res.json();

    console.log(user);

    function formHas(input: string) {
        return formKeys.find(e => e == input);
    }
}