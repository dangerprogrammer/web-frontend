import { redirect } from 'next/navigation';
import { Dispatch, MouseEvent, SetStateAction } from "react";

export async function submitUser(ev: MouseEvent, formContent: any, initialFormContent: any, setErrorMsg: Dispatch<SetStateAction<any>>) {
    function formHas(input: string) {
        return formKeys.find(e => e == input);
    }

    const formKeys = Object.keys(formContent);

    setErrorMsg(undefined);
    ev.preventDefault();
    for (let key of formKeys) if (formContent[key] == initialFormContent[key]) return setErrorMsg('Preencha todos os campos!');

    if ((formHas('password') && formHas('confirmPassword')) &&
        formContent['password'] != formContent['confirmPassword']) return setErrorMsg('As senhas não coincidem!');

    const userRes = await fetch(`http://localhost:3000/users?email=${formContent.email}`);
    const hasUser = await userRes.json();

    if (JSON.stringify(hasUser) != "{}") return setErrorMsg('Já existe um usuário com este e-mail!');

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
    const tokenRes = await res.json();

    const token = {
        access_token: tokenRes.hash,
        refresh_token: tokenRes.hashRefreshToken
    };
    localStorage.setItem("auth", JSON.stringify(token));

    redirect('/');
}