import { Product, Token, User } from "@/types";
import { Dispatch, MouseEvent, SetStateAction } from "react";

export async function submitProduct(ev: MouseEvent, formContent: any, initialFormContent: any, setErrorMsg: Dispatch<SetStateAction<any>>, loggedUser: User) {
    const formKeys = Object.keys(formContent);
    const token = JSON.parse(localStorage.getItem("auth") as string) as Token;

    setErrorMsg(undefined);
    ev.preventDefault();
    for (let key of formKeys) if (formContent[key] == initialFormContent[key]) return setErrorMsg('Preencha todos os campos!');

    const formData = new FormData();

    formData.append('name', formContent.name);
    formData.append('desc', formContent.desc);
    formData.append('category', formContent.category);
    formData.append('condition', formContent.condition);
    formData.append('location', loggedUser.location);
    formData.append('estimatedPrice', formContent.estimatedPrice);
    formData.append('points', formContent.points);

    formContent.images.forEach((file: File) => formData.append('images', file));

    const res = await fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${token.access_token}`
        },
        body: formData
    });

    const product: Product = await res.json();

    alert(`Produto "${product.name}" cadastrado com sucesso!`);
    window.location.reload();
}