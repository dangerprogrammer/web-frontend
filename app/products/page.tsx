'use client';

import { Product, User } from "@/types";
import './page.scss';
import { useEffect, useState } from "react";
import Link from "next/link";
import { verifyUserToken } from "@/scripts";
import { redirect } from "next/navigation";

export default function ProductsPage() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState([]);
  const [filtroCondicao, setFiltroCondicao] = useState([]);
  const [textoBusca, setTextoBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("relevance");
  const [resultados, setResultados] = useState<Product[]>([]);
  const [loggedUser, setLoggedUser] = useState<false | User>(!1);

  function handleCategoriaChange(value: any) {
    setFiltroCategoria((prev: any) =>
      prev.includes(value) ? prev.filter((v: any) => v !== value) : [...prev, value]
    );
  };

  function handleCondicaoChange(value: any) {
    setFiltroCondicao((prev: any) =>
      prev.includes(value) ? prev.filter((v: any) => v !== value) : [...prev, value]
    );
  };

  function atualizarResultados() {
    let filtrados = produtos.filter((prod) => {
      const nomeOk = prod.name.toLowerCase().includes(textoBusca.toLowerCase());
      const categoriaOk = filtroCategoria.length === 0 || filtroCategoria.includes(prod.category as never);
      const condicaoOk = filtroCondicao.length === 0 || filtroCondicao.includes(prod.condition as never);
      return nomeOk && categoriaOk && condicaoOk;
    });

    if (ordenacao === "points") filtrados.sort((a, b) => b.points - a.points);

    setResultados(filtrados);
  };

  useEffect(() => {
    (async () => {
      const loggedUser = await verifyUserToken();

      setLoggedUser(loggedUser);
      if (!(loggedUser && loggedUser.id)) redirect('/login');

      const res = await fetch("http://localhost:3000/products");
      const resProducts = await res.json();

      setProdutos(resProducts);
    })();
  }, []);

  useEffect(() => {
    if (produtos.length > 0) atualizarResultados();
  }, [produtos]);

  // Atualiza ao mudar o texto da busca ou ordenação (mas não os checkboxes)
  useEffect(() => {
    atualizarResultados();
  }, [textoBusca, ordenacao]);

  return (
    <div>
      <header className='products-header'>
        <article className='header-content'>
          <h1 className="header-title">Buscar produtos com a <span className='title-logo'>E-Eco</span></h1>
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

      <main>
        <section className="search-bar">
          <input
            type="text"
            placeholder="Digite o que você está procurando..."
            value={textoBusca}
            onChange={(e) => setTextoBusca(e.target.value)}
          />
          <button onClick={atualizarResultados}>Buscar</button>
        </section>

        <div className="content">
          <aside className="filters">
            <h2 className="titulo-filtro">Filtrar por</h2>

            <div className="filter-group">
              <h3>Categoria</h3>
              {["Componentes", "Eletrônicos", "Computadores", "Celulares", "Equip. Som"].map((cat) => (
                <label key={cat}>
                  <input
                    type="checkbox"
                    value={cat}
                    checked={filtroCategoria.includes(cat as never)}
                    onChange={() => handleCategoriaChange(cat)}
                  />{" "}
                  {cat}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h3>Condição</h3>
              {["Novo", "Usado - Bom", "Usado - Regular"].map((cond) => (
                <label key={cond}>
                  <input
                    type="checkbox"
                    value={cond}
                    checked={filtroCondicao.includes(cond as never)}
                    onChange={() => handleCondicaoChange(cond)}
                  />{" "}
                  {cond}
                </label>
              ))}
            </div>
            <input
              type="submit"
              value="Aplicar Filtros"
              className="btn-aplicar"
              onClick={atualizarResultados}
            />
          </aside>

          <section className="results">
            <div className="results-header">
              <h2>Resultados da Busca ({resultados.length} itens)</h2>
              <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                <option value="relevance">Ordenar por Relevância</option>
                <option value="points">Ordenar por Pontos</option>
              </select>
            </div>
            <div className="product-list">
              {resultados.map((prod, index) => (
                <div key={index} className="product-card">
                  <h4>{prod.name}</h4>
                  <p>{prod.desc}</p>
                  <p className="location">{prod.location}</p>
                  <p className="points">{prod.points} pontos</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <footer>
          <p id="copyright">&copy; 2025 E-ECO from Facens</p>
        </footer>
      </main>
    </div>
  );
}