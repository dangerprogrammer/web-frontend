import { Product, Token, User } from "@/types";
import { Dispatch, MouseEvent, SetStateAction } from "react";

export async function submitProduct(ev: MouseEvent, formContent: any, initialFormContent: any, setErrorMsg: Dispatch<SetStateAction<any>>, loggedUser: User) {
    const formKeys = Object.keys(formContent);
    const token = JSON.parse(localStorage.getItem("auth") as string) as Token;

    setErrorMsg(undefined);
    ev.preventDefault();
    for (let key of formKeys) if (formContent[key] == initialFormContent[key]) return setErrorMsg('Preencha todos os campos!');

    console.log(formContent);

    const createProductPayload = {
        name: formContent.name,
        desc: formContent.desc,
        images: formContent.images,
        category: formContent.category,
        condition: formContent.condition,
        location: loggedUser.location,
        estimatedPrice: formContent.estimatedPrice,
        points: formContent.points
    };

    const res = await fetch("http://localhost:3000/product", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token.access_token}`
        },
        body: JSON.stringify(createProductPayload)
    });
    const product: Product = await res.json();

    alert(`Produto "${product.name}" cadastrado com sucesso!`);
    window.location.reload();
}