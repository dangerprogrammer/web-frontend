import { Product, Token, User } from '@/types';
import './item.scss';
import { capitalize } from '@/scripts';
import Link from 'next/link';
import { IoHeartOutline, IoHeart, IoSendOutline } from 'react-icons/io5';
import { Dispatch, SetStateAction } from 'react';

export function ProductItem({ product, updateUser, interested }: { product: Product, updateUser: Dispatch<SetStateAction<any>>, interested?: boolean }) {
    const token = JSON.parse(localStorage.getItem("auth") as string) as Token;

    return <main className='item-product'>
        <div className="image-container">
            <Link className='shadow-redirect' href={`/products/${product.id}`}></Link>
            <div className="images">
                <div className="shadow-container">
                    <span className="icon" onClick={() => {
                        (async () => {
                            const userRes = await fetch(`http://localhost:3000/user-interest?id=${product.id}`, {
                                headers: {
                                    'Authorization': `bearer ${token.access_token}`
                                },
                            });
                            const user: User = await userRes.json();

                            updateUser(user);
                        })();
                    }}>{interested ? <IoHeart /> : <IoHeartOutline />}</span>
                    <span className="icon"><IoSendOutline /></span>
                </div>
                <img className='product-image' src={`http://localhost:3000${product.images[0]}`} alt={`Produto ${product.name}`} referrerPolicy="no-referrer" />
                <img className='product-image shadow' src={`http://localhost:3000${product.images[0]}`} alt={`Produto ${product.name}`} referrerPolicy="no-referrer" />
            </div>
        </div>
        <section className='product-info'>
            <h1 className='product-title'>{product.name}</h1>
            <p className='product-desc'>{product.desc}</p>
            <small className='row'>
                <span>{product.location}</span>
                <span>{product.points} pontos</span>
            </small>
            <span className={`category ${product.category}`}>{capitalize(product.category)}</span>
        </section>
    </main>
}