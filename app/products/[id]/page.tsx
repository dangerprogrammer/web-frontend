'use client';

import { capitalize, verifyUserToken } from "@/scripts";
import { Product, User } from "@/types";
import Link from "next/link";
import './page.scss';
import { use, useEffect, useState } from "react";
import CopyrightFooter from "@/components/copyright-footer/copy-footer";
import ClipLoader from "react-spinners/ClipLoader";
import { redirect } from "next/navigation";

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
            if (!(loggedUser && loggedUser.id)) redirect('/login');

            const p = await getProduct(productId);

            setProduct(p);
            setLoad(!0);
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
        {load ? (product ? <section className="main-content">
            <section className="product-container">
                <div className="product-images">
                    <div className="images-product">
                        <span className="thumbnail-image">
                            <img src={`http://localhost:3000${product.images[productImage]}`} />
                        </span>
                        {product.images.length > 4 ? <>{product.images
                            .filter((_, i) => i < 3)
                            .map((img, i) => <span className={`product-image${i == productImage ? ' active' : ''}`}
                                onClick={() => setProductImage(i)} key={i}>
                                <img src={`http://localhost:3000${img}`} />
                            </span>)}<span className="product-image click-more">
                                <div className="shadow">+{product.images.length - 3}</div>
                                <img src={`http://localhost:3000${product.images[3]}`} />
                            </span></> : (product.images
                                .filter((_, i) => i < 4)
                                .map((img, i) => <span className={`product-image${i == productImage ? ' active' : ''}`}
                                    onClick={() => setProductImage(i)} key={i}>
                                    <img src={`http://localhost:3000${img}`} />
                                </span>))}
                    </div>
                </div>
                <div className="product-info">
                    <h1 className="title-product">{product.name}</h1>
                    <span className='line'></span>
                    <div className="cards">
                        <div className="card">
                            <small className="title-card">Categoria</small>
                            <p>{capitalize(product.category)}</p>
                        </div>
                        <div className="card">
                            <small className="title-card">Condição</small>
                            <p>{capitalize(product.condition)}</p>
                        </div>
                        <div className="card">
                            <small className="title-card">Pontos</small>
                            <p className="points-card">{product.points} pontos</p>
                        </div>
                    </div>
                    <span className="col">
                        <h3>Descrição Detalhada</h3>
                        <p className="product-desc">{product.desc}</p>
                    </span>
                    <div className="card donator"></div>
                </div>
            </section>
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