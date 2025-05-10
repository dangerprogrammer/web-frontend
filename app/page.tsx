export default function Home() {
  return <>
  <header>
    <div className="header-container">
      <h1><span className="highlight">E-Eco</span></h1>
      <div className="header-right">
        <i className="bi bi-search"></i>
        {/* <input type="text" id="filter-input" placeholder="Pesquisar produtos..." oninput="filterProducts()"> */}
        <nav>
          <ul>
            {/* <li><button onClick="filterCategory('componentes')">Componentes</button></li>
            <li><button onClick="filterCategory('eletronicos')">Doar</button></li>
            <li><button onClick="filterCategory('equipamentos')">Perfil</button></li>
            <li><button onClick="window.location.href='login.html'">Entrar</button></li> */}
          </ul>
        </nav>
      </div>
    </div>
  </header>

  {/* Main content */}
  <main>
    <section className="hero">
      <div className="hero-content">
        <h2>Reduza, reuse, doe!</h2>
        <p>Conectamos doadores de eletrônicos com pessoas que precisam de componentes, promovendo a sustentabilidade e o acesso à tecnologia.</p>
        {/* <button onClick="window.location.href='doacao.html'">Quero Doar</button> */}
      </div>
    </section>

    <section className="product-list" id="product-list">
      <h2>Itens Disponíveis para Doação</h2>
      <div className="products-grid">
        {/* Produtos serão carregados aqui via JavaScript */}
      </div>
      <div>
        {/* <button onClick="window.location.href='busca.html'">Ver todos os itens</button> */}
      </div>
    </section>

    <section className="points-system">
      <h2>Sistema de Pontos</h2>
      <div className="points-info">
        <div className="point-card">
          <i className="bi bi-arrow-up-circle"></i>
          <h3>Doe itens</h3>
          <p>Ganhe pontos por cada doação realizada</p>
        </div>
        <div className="point-card">
          <i className="bi bi-arrow-down-circle"></i>
          <h3>Resgate itens</h3>
          <p>Use seus pontos para obter componentes</p>
        </div>
        <div className="point-card">
          <i className="bi bi-trophy"></i>
          <h3>Benefícios</h3>
          <p>Desbloqueie vantagens conforme sua pontuação</p>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div className="footer-content">
      <div className="footer-logo">
        <h3>E-Eco</h3>
        <p>Reduzindo o lixo eletrônico através da reutilização</p>
      </div>
      <div className="footer-links">
        <h4>Links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="doacao.html">Como doar</a></li>
          <li><a href="pontos.html">Sistema de pontos</a></li>
          <li><a href="sobre.html">Sobre nós</a></li>
        </ul>
      </div>
      <div className="footer-contact">
        <h4>Contato</h4>
        <p>contato@e-eco.org</p>
        <p>(11) 98765-4321</p>
      </div>
    </div>
    <p id="copyright">&copy; 2025 E-Eco from Facens</p>
  </footer>
  </>
}
