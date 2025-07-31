import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.scss"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                throw new Error('Credenziali non valide');
            }

            const data = await res.json();
            localStorage.setItem('token', data.token); // salva il token
            navigate('/'); // redirect alla home
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container-fluid login-page d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px', minWidth: '150px'}}>
                <h2 className="text-center mb-4">Accedi a StreetCats</h2>
                <form>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                        placeholder="Email"
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="email" class="form-label">Password</label>
                    <input 
                        type="password"
                        id="inputPassword5"
                        class="form-control form-control-lg"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Password"
                        required
                    />
                    <div id="passwordHelpBlock" class="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers.
                    </div>
                    </div>
                    <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary btn-lg">Accedi</button>
                    </div>
                </form>
                <p className="text-center">
                    Non hai un account? <Link to="/register">Registrati</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
