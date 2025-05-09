import Link from 'next/link';
import './page.scss';
import CopyrightFooter from '@/components/copyright-footer/copy-footer';
import { IoCamera } from "react-icons/io5";

export default function DonatePage() {
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
                        <Link href={'/points'}>Pontos</Link>
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
                            <input type="text" id='product-name' required placeholder='Ex: Placa Mãe ASUS H110M-K' />
                        </div>
                        <div className='input-divisor'>
                            <label className='input-label' htmlFor="product-estimated">Preço estimado</label>
                            <input type="text" id='product-estimated' required placeholder='Diga o valor que acredita que este produto vale' />
                        </div>
                        <div className='input-divisor'>
                            <label className='input-label' htmlFor="product-category">Categoria</label>
                            <select id='product-category' required>
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
                            <select id='product-condition' required>
                                <option value="">Selecione a condição do produto</option>
                                <option value="usado-bom">Usado em bom estado</option>
                                <option value="usado-regular">Usado regular</option>
                                <option value="defeito">Com defeito</option>
                            </select>
                        </div>
                        <div className='input-divisor'>
                            <label className='input-label' htmlFor="product-desc">Descrição detalhada</label>
                            <textarea id='product-desc' required placeholder='Descreva o item, incluindo marca, modelo, estado de conservação, defeitos (se houver)...' />
                        </div>
                        <div className='input-divisor'>
                            <label className='input-label'>Fotos do Produto (máximo de 8 imagens)</label>
                            <div className='images-list'>
                                <label htmlFor="donate-images" className='label-files'>
                                    <span className='files-container'>
                                        <div style={{ fontSize: '2em' }}><IoCamera /></div>
                                        <span>Clique para adicionar fotos</span>
                                    </span>
                                </label>
                                <input type='file' id='donate-images' accept="image/*" required multiple hidden />
                            </div>
                        </div>
                    </form>
                    <button type='submit' form='donate-form' className='submit-donate'>Cadastrar Doação</button>
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
                            <span style={{ paddingInline: '.5em', fontSize: '1.5em', fontWeight: '700' }} id='points-score'>0</span>
                            <span className='score-desc'>pontos</span>
                        </div>
                    </main>
                </section>
            </main>
        </article>
        <CopyrightFooter />
    </main>
}