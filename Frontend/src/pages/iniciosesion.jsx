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

        let res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email, password: password}),
        });
        let data = await res.json();
        if(data.length < 1)
        {
            setError('Usuario Inexistente o Contraseña Incorrecta');
            return;
        }
        localStorage.setItem('id', data[0].id);
        localStorage.setItem('tipo', data[0].tipo);
        window.location.href = "/inicio";
    }

    return (
        <div className="login-container"> 
            <form onSubmit={login} className="login-card">
                <h1>El resto de la 5</h1>
                <p className="subtitle">- Personal -</p>
                
                <p className="form-section-title">Correo electrónico</p>
                <input 
                    type='email' 
                    placeholder='Ingresa tu correo electrónico' 
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}} 
                    required
                />
                
                <p className="form-section-title">Contraseña</p>
                <input 
                    type='password' 
                    placeholder='Ingresa tu contraseña' 
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}} 
                    required
                />
                
                <button type='submit'>Ingresar</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

export default InicioSesion
