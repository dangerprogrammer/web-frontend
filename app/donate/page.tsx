'use client';

import Link from 'next/link';
import './page.scss';
import CopyrightFooter from '@/components/copyright-footer/copy-footer';
import { IoCamera } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { verifyUserToken, submitProduct } from '@/scripts';
import { redirect } from 'next/navigation';
import { User } from '@/types';

const conditionPointsMultiplier = {
  'novo': 2,
  'usado-bom': 1.8,
  'usado-regular': 1.5,
  'defeito': 1
};

export default function DonatePage() {
  const initialFormContent = {
    name: '',
    estimatedPrice: '',
    category: '',
    condition: '',
    desc: '',
    images: '',
    points: 0
  };
  const [formContent, setFormContent] = useState(initialFormContent);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [estimated, setEstimated] = useState<string>((0).toLocaleString("pt-BR", {
    style: 'currency', currency: 'BRL'
  }));
  const [images, setImages] = useState<any[]>([]);
  const [hidePhoto, setHidePhoto] = useState(!1);
  const [loggedUser, setLoggedUser] = useState<false | User>(!1);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    (async () => {
      const loggedUser = await verifyUserToken();

      setLoggedUser(loggedUser);
      if (!(loggedUser as User).id) redirect('/login');
    })();
  }, []);

  useEffect(() => setFormContent((prev: any) => ({ ...prev, points })), [points]);

  return <main className='donate-page'>
    <header className='donate-header'>
      <article className='header-content'>
        <h1 className='header-title'>Doe seus produtos com a <span className='title-logo'>E-Eco</span></h1>
        <ul className='links-list'>
          <li className='link-header'>
            <Link href={'/'}>Home</Link>
          </li>
          <li className='link-header active'>
            <Link href={'/donate'}>Doar</Link>
          </li>
          <li className='link-header'>
            <Link href={'/score'}>Pontos</Link>
          </li>
        </ul>
      </article>
    </header>
    <article className='donate-container'>
      <main className='main-content'>
        <section className='form-donate'>
          <h1 className='donate-title'>Cadastrar Doação</h1>
          <span className='line'></span>
          <form id='donate-form'>
            <div className='input-divisor'>
              <label className='input-label' htmlFor="product-name">Título do Produto</label>
              <input
                onChange={ev => setFormContent((prev: any) => ({ ...prev, name: ev.target.value }))}
                type="text" id='product-name' required placeholder='Ex: Placa Mãe ASUS H110M-K' />
            </div>
            <div className='input-divisor'>
              <label className='input-label' htmlFor="product-estimated">Preço estimado</label>
              <input
                onChange={ev => {
                  setFormContent((prev: any) => ({ ...prev, estimatedPrice: +ev.target.value }));
                  setEstimated((+ev.target.value).toLocaleString("pt-BR", {
                    style: 'currency', currency: 'BRL'
                  }));
                  setPoints(Math.floor(+ev.target.value / 20 * ((conditionPointsMultiplier as any)[formContent.condition] || 1)));
                }}
                type="number" step="0.01" id='product-estimated' required placeholder='Diga o valor que acredita que este produto vale' />
              <small id="estimated-price" style={{ opacity: '.8' }}>{estimated}</small>
            </div>
            <div className='input-divisor'>
              <label className='input-label' htmlFor="product-category">Categoria</label>
              <select
                onChange={ev => setFormContent((prev: any) => ({ ...prev, category: ev.target.value }))}
                id='product-category' required>
                <option value="">Selecione uma categoria</option>
                <option value="componentes">Componentes Eletrônicos</option>
                <option value="eletronicos">Eletrônicos Completos</option>
                <option value="computadores">Computadores/Notebooks</option>
                <option value="celulares">Celulares/Tablets</option>
                <option value="som">Equipamentos de Som</option>
                <option value="outros">Outros</option>
              </select>
            </div>
            <div className='input-divisor'>
              <label className='input-label' htmlFor="product-condition">Condição</label>
              <select
                onChange={ev => {
                  setFormContent((prev: any) => ({ ...prev, condition: ev.target.value }));
                  setPoints(Math.floor(+formContent.estimatedPrice / 20 * ((conditionPointsMultiplier as any)[ev.target.value] || 1)));
                }}
                id='product-condition' required>
                <option value="">Selecione a condição do produto</option>
                <option value="novo">Novo</option>
                <option value="usado-bom">Usado em bom estado</option>
                <option value="usado-regular">Usado regular</option>
                <option value="defeito">Com defeito</option>
              </select>
            </div>
            <div className='input-divisor'>
              <label className='input-label' htmlFor="product-desc">Descrição detalhada</label>
              <textarea
                onChange={ev => setFormContent((prev: any) => ({ ...prev, desc: ev.target.value }))}
                id='product-desc' required placeholder='Descreva o item, incluindo marca, modelo, estado de conservação, defeitos (se houver)...' />
            </div>
            <div className='input-divisor'>
              <label className='input-label'>Fotos do Produto (máximo de 8 imagens)</label>
              <div className='images-list'>
                <div className='images-preview'>
                  {images.map((src, index) => (
                    <span className='image-preview' key={index}>
                      <img
                        src={src}
                        alt={`preview-${index}`}
                        className='shadow-img'
                      />
                      <img
                        src={src}
                        alt={`preview-${index}`}
                        className='img'
                      />
                    </span>
                  ))}
                </div>
                <label htmlFor="donate-images" className={`label-files${hidePhoto ? ' hidden' : ''}`}>
                  <span className='files-container'>
                    <div style={{ fontSize: '2em' }}><IoCamera /></div>
                    <span>{hidePhoto ? 'Você atingiu o limite de fotos!' : 'Clique para adicionar fotos'}</span>
                  </span>
                </label>
                <input
                  onChange={ev => {
                    const tFiles = [...ev.target.files!];
                    const files = tFiles.filter((_, i) => i > (tFiles.length - 8) - 1);

                    setHidePhoto(files.length == 8);
                    setFormContent((prev: any) => ({ ...prev, images: files }));

                    const readers = files.filter(file => file.type.startsWith('image/')).map(file => {
                      return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                      });
                    });

                    Promise.all(readers).then(imagesData => {
                      setImages((prev: any[]) => {
                        const images = [...prev, ...imagesData];

                        return images.filter((_, i) => i > (images.length - 8) - 1);
                      });
                    });
                  }}
                  type='file' id='donate-images' accept="image/*" required multiple hidden />
              </div>
            </div>
          </form>
          {errorMsg ? <span className='error-msg'>{errorMsg}</span> : undefined}
          <button type='submit' form='donate-form' className={`submit-donate${loggedUser ? '' : ` hidden`}`} onClick={ev => submitProduct(ev, formContent, initialFormContent, setErrorMsg, loggedUser as User)}>Cadastrar Doação</button>
        </section>
        <section className='donate-table'>
          <main className='table-content'>
            <h1 className='donate-title'>Sistema de Pontos</h1>
            <span className='line'></span>
            <p className='table-desc'>Ao doar itens na E-Eco, você acumula pontos que podem ser trocados por outros itens ou benefícios.</p>
            <table className='points-table'>
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Pontos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Componentes</td>
                  <td>10-30 pts</td>
                </tr>
                <tr>
                  <td>Eletrônicos</td>
                  <td>30-50 pts</td>
                </tr>
                <tr>
                  <td>Computadores</td>
                  <td>50-100 pts</td>
                </tr>
                <tr>
                  <td>Celulares</td>
                  <td>40-80 pts</td>
                </tr>
                <tr>
                  <td>Equip. Som</td>
                  <td>30-60 pts</td>
                </tr>
              </tbody>
            </table>
            <p className='table-desc'>Itens em bom estado ou raros valem mais pontos. Nossa equipe avaliará sua doação.</p>
            <div className='score-points'>
              <span className='score-desc'>Sua doação vale aproximadamente</span>
              <span style={{ paddingInline: '.5em', fontSize: '1.5em', fontWeight: '700' }}>{points}</span>
              <span className='score-desc'>pontos</span>
            </div>
          </main>
        </section>
      </main>
    </article>
    <CopyrightFooter />
  </main>
}