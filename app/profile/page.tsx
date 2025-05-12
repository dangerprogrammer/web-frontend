'use client';

import { useEffect, useState } from 'react';
import './page.scss';
import { User } from '@/types';
import { verifyUserToken } from '@/scripts';
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const [loggedUser, setLoggedUser] = useState<false | User>(!1);

  useEffect(() => {
    (async () => {
      const loggedUser = await verifyUserToken();

      if (!(loggedUser && loggedUser.id)) redirect('/login');

      const res = await fetch(`http://localhost:3000/user-products?email=${loggedUser.email}`);
      const user = await res.json();

      console.log(user);
    })();
  }, []);

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
      alert('Você foi desconectado com sucesso.');
      // Em uma aplicação real, redirecionaria para a página inicial
    }
  };

  return (
    <main className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">M</div>
        <div className="profile-info">
          <h2>Maria Oliveira</h2>
          <p>Membro desde Março/2023</p>
        </div>
      </div>

      <div className="profile-sections">
        {/* Dados Pessoais */}
        <section className="profile-section personal-data">
          <div className="section-header">
            <div className="section-icon icon-user">👤</div>
            <h3 className="section-title">Dados Pessoais</h3>
          </div>
          <p><strong>Nome:</strong> Maria Oliveira</p>
          <p><strong>E-mail:</strong> maria.oliveira@exemplo.com</p>
          <p><strong>Localização:</strong> São Paulo, SP</p>
          <p><strong>Telefone:</strong> (11) 98765-4321</p>
          <button className="edit-btn" onClick={() => handleEditProfile()}>Editar Perfil</button>
        </section>

        {/* Minhas Doações */}
        <section className="profile-section">
          <div className="section-header">
            <div className="section-icon icon-donation">🎁</div>
            <h3 className="section-title">Minhas Doações</h3>
          </div>
          <ul className="item-list">
            <li className="item-card">
              <h3>Placa Mãe ASUS H110M-K</h3>
              <div className="item-meta">
                <span>30 pontos</span>
                <span className="item-status status-completed">Concluída</span>
              </div>
            </li>
            <li className="item-card">
              <h3>Monitor LED 24&quot;</h3>
              <div className="item-meta">
                <span>60 pontos</span>
                <span className="item-status status-pending">Em andamento</span>
              </div>
            </li>
            <li className="item-card">
              <h3>Teclado Mecânico</h3>
              <div className="item-meta">
                <span>25 pontos</span>
                <span className="item-status status-available">Disponível</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Meus Interesses */}
        <section className="profile-section">
          <div className="section-header">
            <div className="section-icon icon-interest">❤️</div>
            <h3 className="section-title">Meus Interesses</h3>
          </div>
          <ul className="item-list">
            <li className="item-card">
              <h3>Notebook Dell i5</h3>
              <div className="item-meta">
                <span>80 pontos</span>
                <span className="item-status status-pending">Aguardando</span>
              </div>
            </li>
            <li className="item-card">
              <h3>Smartphone Samsung S8</h3>
              <div className="item-meta">
                <span>60 pontos</span>
                <span className="item-status status-available">Disponível</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Saldo de Pontos */}
        <section className="profile-section">
          <div className="section-header">
            <div className="section-icon icon-points">⭐</div>
            <h3 className="section-title">Saldo de Pontos</h3>
          </div>
          <div className="points-balance">145 pts</div>
          <div className="points-actions">
            <button className="points-btn">Como ganhar mais</button>
            <button className="points-btn">Resgatar pontos</button>
          </div>
        </section>
      </div>

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