import { Token, User } from "@/types";
import { Dispatch, MouseEvent, SetStateAction } from "react";

export async function loginUser(ev: MouseEvent, formContent: any, initialFormContent: any, setErrorMsg: Dispatch<SetStateAction<any>>) {
    const formKeys = Object.keys(formContent);

    setErrorMsg(undefined);
    ev.preventDefault();
    for (let key of formKeys) if (formContent[key] == initialFormContent[key]) return setErrorMsg('Preencha todos os campos!');

    const loginPayload = {
        email: formContent.email,
        password: formContent.password
    };
    
    let tokenRes: any;

    await fetch("http://localhost:3000/signin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginPayload)
    }).catch(err => {
        console.log('error', err);
        setErrorMsg(err.statusText);
    }).then(async t => {
        tokenRes = await t!.json();
    }).finally(() => {
        const token = {
            access_token: tokenRes.hash,
            refresh_token: tokenRes.hashRefreshToken
        };

        localStorage.setItem("auth", JSON.stringify(token));
    });
};

export async function verifyUserToken() {
    const token = JSON.parse(localStorage.getItem("auth") as string) as Token;

    if (!token) return !1;

    const res = await fetch("http://localhost:3000/search-token", {
        headers: {
            'Authorization': `bearer ${token.access_token}`
        }
    });
    const tokenRes: User = await res.json();

    if (!tokenRes) return !1;

    return tokenRes;
}