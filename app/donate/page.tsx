import Link from 'next/link';
import './page.scss';
import CopyrightFooter from '@/components/copyright-footer/copy-footer';

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
        <article className='main-content'></article>
        <CopyrightFooter/>
    </main>
}