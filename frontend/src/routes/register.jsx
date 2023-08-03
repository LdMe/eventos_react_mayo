import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

const Register = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()
        const form = e.target
        const data = {
            email: form.email.value,
            password: form.password.value,
            confirmPassword: form.confirmPassword.value
        }
        let result = await fetch('http://localhost:3333/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if(!result.ok) {
            const message = await result.json();
            setError(message.message);
            return;
        }
        result = await result.json();
        console.log(result);
        const token = result.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(result.email));
        navigate('/');
    }

    return (
        <section id="register-form">
            <h2>Registro</h2>
            <p class="error">{error}</p>
            <form action="http://localhost:3333/api/users/register" method="POST" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" id="password" required />
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <input type="password" name="confirmPassword" id="confirmPassword" required />
                <button type="submit">Registrarse</button>
            </form>
        </section>
    )
}

export default Register