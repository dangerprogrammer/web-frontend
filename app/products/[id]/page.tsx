'use client';

import { verifyUserToken } from "@/scripts";
import { Product, User } from "@/types";
import Link from "next/link";
import './page.scss';
import { use, useEffect, useState } from "react";
import CopyrightFooter from "@/components/copyright-footer/copy-footer";
import ClipLoader from "react-spinners/ClipLoader";

async function getProduct(id: string) {
    const res = await fetch(`http://localhost:3000/products/product?id=${id}`);

    return await res.json();
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const productId = use(params).id;
    const [product, setProduct] = useState<Product | null>(null);
    const [load, setLoad] = useState(!1);
    const [loggedUser, setLoggedUser] = useState<false | User>(!1);
    const [productImage, setProductImage] = useState(0);

    useEffect(() => {
        (async () => {
            const loggedUser = await verifyUserToken();

            setLoggedUser(loggedUser);

            const p = await getProduct(productId);

            setProduct(p);
            setLoad(!0);

            console.log(p);
        })();
    }, []);

    return <main className="product-page">
        <header className='product-header'>
            <article className='header-content'>
                <h1 className="header-title">Detalhes do item na <span className='title-logo'>E-Eco</span></h1>
                <ul className='links-list'>
                    <li className='link-header'>
                        <Link href={'/'}>Home</Link>
                    </li>
                    <li className='link-header'>
                        <Link href={'/donate'}>Doar</Link>
                    </li>
                    {(loggedUser && loggedUser.id) ? <li className='link-header'>
                        <Link href={'/profile'}>Perfil</Link>
                    </li> : <li className='link-header'>
                        <Link href={'/login'}>Entrar</Link>
                    </li>}
                </ul>
            </article>
        </header>
        {load ? (product ? <section className="product-container">
            <div className="product-images">
                <div className="images-product">
                    <span className="thumbnail-image">
                        <img src={`http://localhost:3000${product.images[productImage]}`}/>
                    </span>
                    {product.images
                    .filter((img, i) => i > product.images.length - 4 - 1)
                    .map((img, i) => <span className="product-image" key={i}>
                        <img src={`http://localhost:3000${img}`} />
                    </span>)}
                </div>
            </div>
        </section> : <section className="no-product">
            <h1 className="title">Produto não encontrado</h1>
        </section>) : <section className="loading">
            <ClipLoader color="#fa7305" size={60} />
            <p>Carregando produto...</p>
        </section>}
        <CopyrightFooter />
    </main>
    // (
    //     <div>Opa
    //         {!load ? ((product && product.id) ? <h1>{product.name}</h1> : <h1>SEM PRODUTO</h1>) : <h1>CARREGANDO PRODUTO</h1>}
    //     </div>
    // );
}