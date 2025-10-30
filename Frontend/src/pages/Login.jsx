import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    
    function validar() {
        setError('')
        let valido = true
        
        if(!email) {
            valido = false
            setError('Email es requerido')
        }
        
        if(!password) {
            valido = false
            setError('Contraseña es requerida')
        }
        
        return valido
    }

    async function handleLogin(e) {
        e.preventDefault()
        if (!validar()) return

        setLoading(true)
        setError('')

        try {
            console.log('🔄 Iniciando proceso de login...')
            const result = await login(email, password)
            
            if (!result.success) {
                setError(result.error)
                console.log('❌ Login fallido:', result.error)
            } else {
                console.log('✅ Login exitoso')
            }
        } catch (error) {
            console.error('💥 Error en handleLogin:', error)
            setError('Error inesperado: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h3>Iniciar Sesión - Restó de la 5</h3>
                <input 
                    type='email' 
                    placeholder='Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    disabled={loading}
                />
                <br />
                <input 
                    type='password' 
                    placeholder='Contraseña' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    disabled={loading}
                />
                <br />
                <button type='submit' disabled={loading}>
                    {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                </button>
                {error && <p className="error-message">{error}</p>}
                
                {/* Información de debug */}
                <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#666' }}>
                    <p>Backend: http://localhost:3000</p>
                    <p>Ruta: POST /login</p>
                </div>
            </form>
        </div>
    )
}

export default Login