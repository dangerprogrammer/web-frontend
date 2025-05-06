'use client';

import { InputBox } from '@/components';
import './page.scss';
import { useState } from 'react';
import { submitUser } from '@/scripts';

export default function RegisterPage() {
    const [visible, setVisible] = useState(!1);
    const initialFormContent = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        location: '',
        phone: '',
        iAm: ''
    };
    const [formContent, setFormContent] = useState(initialFormContent);
    const [errorMsg, setErrorMsg] = useState<string>();

    return <main className='register-container'>
        <section className='container-header'>
            <h1 className='header-title'>E-ECO</h1>
            <h4 className='desc'>Reduze, reutilize, doe!</h4>
        </section>
        <form id='register-form' className='main-content'>
            <InputBox formChange={setFormContent} change='name' id='nome-completo' placeholder="Nome completo" />
            <InputBox formChange={setFormContent} change='email' id='email' placeholder="Email" />
            <InputBox formChange={setFormContent} change='iAm' id='i-am' placeholder="Eu sou..." options={
                [{ value: "doador", text: "Doador" }, { value: "receptor", text: "Receptor" }, { value: "ambos", text: "Ambos (quero doar e receber)" }]} />
            <InputBox formChange={setFormContent} change='phone' id='phone' placeholder="Telefone" />
            <InputBox formChange={setFormContent} change='location' id='cidade-estado' placeholder="Cidade/Estado" />
            <InputBox formChange={setFormContent} change='password' id='password' placeholder="Senha" visiblePassword={visible} setVisible={setVisible} isPassword />
            <InputBox formChange={setFormContent} change='confirmPassword' id='confirm-password' placeholder="Confirme sua senha"
                visiblePassword={visible} setVisible={setVisible} isPassword confirmPassword />
        </form>
        {errorMsg ? <span className='error-msg'>{errorMsg}</span> : undefined}
        <section className='footer-content'>
            <button type='submit' form='register-form' onClick={ev => submitUser(ev, formContent, initialFormContent, setErrorMsg)}>Cadastrar</button>
        </section>
    </main>
}