'use client';

import Link from 'next/link';
import './page.scss';
import { useEffect, useState } from 'react';
import { verifyUserToken } from '@/scripts';
import { Product, User } from '@/types';
import { IoSearch } from "react-icons/io5";
import { ProductItem } from '@/components/product-item/item';

export default function Home() {
  const [loggedUser, setLoggedUser] = useState<boolean | User>(!1);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const loggedUser = await verifyUserToken();

      setLoggedUser(loggedUser);

      const res = await fetch("http://localhost:3000/products");
      const resProducts = await res.json();

      console.log(resProducts);
      setProducts(resProducts);
    })();
  }, []);

  return <main className="home-page">
    <header className='home-header'>
      <article className='header-content'>
        <h1 className="header-title">E-Eco</h1>
        <ul className='links-list'>
          <div className='product-search'>
            <label htmlFor='search-product'>
              <IoSearch />
            </label>
            <input type='text' className='search-product'
            onChange={ev => setSearch(ev.target.value)}
            id='search-product' placeholder='Pesquisar produtos' />
          </div>
          <li className='link-header'>
            <Link href={'/donate'}>Doar</Link>
          </li>
          {loggedUser ? <li className='link-header'>
            <Link href={'/profile'}>Perfil</Link>
          </li> : <li className='link-header'>
            <Link href={'/login'}>Entrar</Link>
          </li>}
        </ul>
      </article>
    </header>
    <article className='home-article'>
      <h1>Reduza, reuse, doe!</h1>
      <small style={{maxWidth: '50%', textAlign: 'center'}}>Conectamos doadores de eletrônicos com pessoas que precisam de componentes, promovendo a sustentabilidade e o acesso à tecnologia.</small>
      <Link href={'/donate'}>Quero Doar</Link>
    </article>
    <article className='main-article'>
      <h1 className='title-article'>Itens Disponíveis para Doação</h1>
      <ul className='main-products'>
        {products.map((product, i) => <ProductItem key={i} product={product} img={product.image}/>)}
      </ul>
    </article>
    <article className="info-article"></article>
  </main>
}