import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
        setError(null);

        try {
            const res = await axios.post('http://localhost:3001/api/auth/login', {email, password});
            localStorage.setItem('token', res.data.token); // salva il token
            navigate('/'); // redirect alla home
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.error || 'Errore nel login');
            } else {
                setError(err.message);
            }        
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
                        placeholder="es: garfield@ilgatto.cat"
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
                            placeholder="es: MiaoPassword123"
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
