import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./SignUp.scss";

// Import per icone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function SignUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    
    /**
     * Funzione toggle per aggiornare la visibilità della password 
    */
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    /**
     * Funzione per validare password: 8-20 char, almeno una lettera e un numero
     * @param {String} password - password inserita 
    */
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        return regex.test(password);
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (username.length > 20) {
            setError('Lo username deve essere al massimo di 20 caratteri');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password non consentita');
            return;
        }

        try {
            const res = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Errore nella registrazione');
            }

            const data = await res.json();
            localStorage.setItem('token', data.token);
            navigate('/');  // redirect alla home dopo registrazione
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container-fluid signup-page d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px', minWidth: '150px'}}>
                <h2 className="text-center mb-4">Registrati a StreetCats</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            id="username"
                            placeholder="Username"
                            autoComplete='off'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            maxLength={20}
                            required
                        />
                    </div>
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
                        <label htmlFor="inputPassword5" className="form-label">Password</label>
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
                        <div id="passwordHelpBlock" className="form-text">
                            Your password must be 8-20 characters long, contain letters and numbers.
                        </div>
                    </div>
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary btn-lg">Registrati</button>
                    </div>
                </form>
                <p className="text-center">
                    Hai già un account? <Link to="/login">Accedi</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
