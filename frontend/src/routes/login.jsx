import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";

import LoggedInContext from "../context/loggedInContext";

const Login = () => {
    const {isLoggedIn,setIsLoggedIn} = useContext(LoggedInContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        
        e.preventDefault()
        const form = e.target
        const data = {
            email: form.email.value,
            password: form.password.value
        }
        let result = await fetch('http://localhost:3333/api/login', {
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
        setIsLoggedIn(true);
        navigate('/');
    }
    return (
        <section id="login-form">
            <h2>Login</h2>
            <p className="error">{error}</p>
            <form action="http://localhost:3333/api/users/login" method="POST" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" id="password" required />
                <button type="submit">Iniciar sesión</button>
            </form>
        </section>

    )
}

export default Login;