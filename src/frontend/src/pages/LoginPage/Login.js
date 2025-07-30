import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.scss"

function Login() {
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
