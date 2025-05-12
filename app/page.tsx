'use client';

import Link from 'next/link';
import './page.scss';
import { useEffect, useState } from 'react';
import { verifyUserToken } from '@/scripts';
import { Product, User } from '@/types';
import {
  IoSearch,
  IoArrowUpCircleOutline,
  IoArrowDownCircleOutline,
  IoTrophyOutline
} from "react-icons/io5";
import { ProductItem } from '@/components/product-item/item';
import CopyrightFooter from '@/components/copyright-footer/copy-footer';

export default function Home() {
  const [loggedUser, setLoggedUser] = useState<false | User>(!1);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const loggedUser = await verifyUserToken();

      const res = await fetch("http://localhost:3000/products");
      const resProducts = await res.json();

      setProducts(resProducts);

      if (loggedUser && loggedUser.id) {
        const resUser = await fetch(`http://localhost:3000/user-products?email=${loggedUser.email}`);
        const user: User = await resUser.json();

        setLoggedUser(user);
      } else setLoggedUser(loggedUser);
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
          {(loggedUser && loggedUser.id) ? <li className='link-header'>
            <Link href={'/profile'}>Perfil</Link>
          </li> : <li className='link-header'>
            <Link href={'/login'}>Entrar</Link>
          </li>}
        </ul>
      </article>
    </header>
    <article className='home-article'>
      <h1>Reduza, reuse, doe!</h1>
      <small style={{ maxWidth: '50%', textAlign: 'center' }}>Conectamos doadores de eletrônicos com pessoas que precisam de componentes, promovendo a sustentabilidade e o acesso à tecnologia.</small>
      <Link href={'/donate'}>Quero Doar</Link>
    </article>
    <article className='main-article'>
      <h1 className='title-article'>Itens Disponíveis para Doação</h1>
      <ul className='main-products'>
        {products.map((product, i) => {
          const hasProduct = loggedUser && loggedUser.id && loggedUser.interestedProducts.find(({ id }) => id == product.id);
          
          return <ProductItem key={i} product={product} updateUser={setLoggedUser} interested={!!hasProduct} />
        })}
      </ul>
    </article>
    <article className="info-article">
      <h1 className='title-article'>Sistema de Pontos</h1>
      <div className="info-cards">
        <section className="card">
          <IoArrowUpCircleOutline className='card-icon' />
          <h2 className='card-title'>Doe itens</h2>
          <p className='card-desc'>Ganhe pontos por cada doação realizada</p>
        </section>
        <section className="card">
          <IoArrowDownCircleOutline className='card-icon' />
          <h2 className='card-title'>Resgate itens</h2>
          <p className='card-desc'>Use seus pontos para obter componentes</p>
        </section>
        <section className="card">
          <IoTrophyOutline className='card-icon' />
          <h2 className='card-title'>Benefícios</h2>
          <p className='card-desc'>Desbloqueie vantagens conforme sua pontuação</p>
        </section>
      </div>
    </article>
    <CopyrightFooter />
  </main>
}