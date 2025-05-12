'use client';

import { useEffect, useState } from 'react';
import './page.scss';
import { User } from '@/types';
import { verifyUserToken } from '@/scripts';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const [loggedUser, setLoggedUser] = useState<User>();

  useEffect(() => {
    (async () => {
      const loggedUser = await verifyUserToken();

      if (!(loggedUser && loggedUser.id)) redirect('/login');

      const res = await fetch(`http://localhost:3000/user-products?email=${loggedUser.email}`);
      const user = await res.json();

      setLoggedUser(user);
      console.log(user);
    })();
  }, []);

  function handleLogout() {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
      localStorage.removeItem("auth");

      alert('Você foi desconectado com sucesso.');
      redirect("/");
    }
  };

  return (
    <main className="profile-container">
      <header className='profile-header'>
        <article className='header-content'>
          <h1 className="header-title">Buscar produtos com a <span className='title-logo'>E-Eco</span></h1>
          <ul className='links-list'>
            <li className='link-header'>
              <Link href={'/'}>Home</Link>
            </li>
            <li className='link-header'>
              <Link href={'/donate'}>Doar</Link>
            </li>
          </ul>
        </article>
      </header>

      {loggedUser ? <section className='profile-content'>
        <div className="profile-sec-header">
          <div className="profile-avatar">{loggedUser.name[0]}</div>
          <div className="profile-info">
            <h2>{loggedUser.name}</h2>
            <p>Membro desde {new Date(loggedUser.joinedAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="profile-sections">
          {/* Dados Pessoais */}
          <section className="profile-section personal-data">
            <div className="section-header">
              <div className="section-icon icon-user">👤</div>
              <h3 className="section-title">Dados Pessoais</h3>
            </div>
            <p><strong>Nome:</strong> {loggedUser.name}</p>
            <p><strong>E-mail:</strong> {loggedUser.email}</p>
            <p><strong>Localização:</strong> {loggedUser.location}</p>
            <p><strong>Telefone:</strong> {loggedUser.phone}</p>
            <button className="edit-btn" onClick={() => handleEditProfile()}>Editar Perfil</button>
          </section>

          {/* Minhas Doações */}
          <section className="profile-section">
            <div className="section-header">
              <div className="section-icon icon-donation">🎁</div>
              <h3 className="section-title">Minhas Doações</h3>
            </div>
            <ul className="item-list">
              {loggedUser.ownerProducts.map((product, i) => <li key={i} className='item-card' onClick={() => redirect(`/products/${product.id}`)}>
                <h3>{product.name}</h3>
                <div className="item-meta">
                  <span>{product.points} pontos</span>
                </div>
              </li>)}
            </ul>
          </section>

          {/* Meus Interesses */}
          <section className="profile-section">
            <div className="section-header">
              <div className="section-icon icon-interest">❤️</div>
              <h3 className="section-title">Meus Interesses</h3>
            </div>
            <ul className="item-list">
              {loggedUser.interestedProducts.map((product, i) => <li key={i} className='item-card' onClick={() => redirect(`/products/${product.id}`)}>
                <h3>{product.name}</h3>
                <div className="item-meta">
                  <span>{product.points} pontos</span>
                </div>
              </li>)}
            </ul>
          </section>

          {/* Saldo de Pontos */}
          <section className="profile-section">
            <div className="section-header">
              <div className="section-icon icon-points">⭐</div>
              <h3 className="section-title">Saldo de Pontos</h3>
            </div>
            <div className="points-balance">{loggedUser.totalPoints} pts</div>
            <div className="points-actions">
              <button className="points-btn">Como ganhar mais</button>
              <button className="points-btn">Resgatar pontos</button>
            </div>
          </section>
        </div>
      </section> : <h1>Carregando usuário...</h1>}

      {/* Botão Sair */}
      <div className="logout-section">
        <button className="logout-btn" onClick={() => handleLogout()}>Sair da Conta</button>
      </div>
    </main>
  );
}

function handleEditProfile() {
  alert('Redirecionando para a edição do perfil...');
};