'use client';

import { useState } from 'react';
import './page.scss';
import { loginUser } from '@/scripts';
import { InputBox } from '@/components';

export default function LoginPage() {
    const [visible, setVisible] = useState(!1);
    const initialFormContent = {
        email: '',
        password: ''
    };
    const [formContent, setFormContent] = useState(initialFormContent);
    const [errorMsg, setErrorMsg] = useState<string>();

    return <main className='login-container'>
        <section className='container-header'>
            <h1 className='header-title'>Login</h1>
            <h4 className='desc'>Reduze, reutilize, doe!</h4>
        </section>
        <form id='login-form' className='main-content'>
            <InputBox formChange={setFormContent} change='email' id='email' placeholder="Email" />
            <InputBox formChange={setFormContent} change='password' id='password' placeholder="Senha" visiblePassword={visible} setVisible={setVisible} isPassword />
        </form>
        {errorMsg ? <span className='error-msg'>{errorMsg}</span> : undefined}
        <section className='footer-content'>
            <button type='submit' form='login-form' className='submit-login'
                onClick={ev => loginUser(ev, formContent, initialFormContent, setErrorMsg)}>Fazer login</button>
        </section>
        <span>Ainda não possui uma conta? <a href="/register">Cadastre-se</a></span>
    </main>
}