import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function InicioSesion() 
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    function validar()
    {
        setError('');
        let valido = true;
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if(!emailRegex.test(email))
        {
            valido = false;
            setError('Email Invalido');
        }
        if(password.length < 6 || password.length > 24)
        {
            valido = false;
            setError('Contraseña debe ser de al entre 6 y 24 caracteres');
        }
        return valido;
    }

    async function login(e)
    {
        e.preventDefault();
        if(!validar()) return;

  /*      let res = await fetch('http://10.0.6.128:3031/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email, password: password}),
        });
        let data = await res.json();
        if(typeof data.id === 'undefined')
        {
            setError('Usuario Inexistente');
            return;
        }
        localStorage.setItem('id', data.id);
        localStorage.setItem('tipo', data.tipo);*/
        window.location.href = "/Inicio";
    }

    return (
        <div> 
            <form onSubmit={login}>
                <h3>Iniciar Sesion</h3>
                <input type='email' placeholder='Email' onChange={(e) => {setEmail(e.target.value)}} required/>
                <br />
                <input type='password' placeholder='Contraseña' onChange={(e) => {setPassword(e.target.value)}} required/>
                <br />
                <button type='submit'>Iniciar Sesion</button>
                <p>{error}</p>
            </form>
        </div>
    )
}

export default InicioSesion
