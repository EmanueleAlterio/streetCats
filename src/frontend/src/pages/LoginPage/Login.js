import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.scss"

// Import per icone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Funzione toggle per aggiornare la visibilità della password 
    */
    const togglePasswordVisibility = () => {
        setShowPassword(visible => !visible);
    };
    
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
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="inputPassword5" class="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control form-control-lg"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-describedby="passwordHelpBlock"
                            required
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={togglePasswordVisibility}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <div id="passwordHelpBlock" class="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers.
                    </div>
                    </div>
                    <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary btn-lg">Accedi</button>
                    </div>
                </form>
                <p className="text-center">
                    Non hai un account? <Link to="/signup">Registrati</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
