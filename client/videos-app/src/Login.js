import React, { useState } from 'react';
import { login } from './client/auth.js';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import img from './assets/login-left.svg';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleRedirect = async () => {
        const params = new URLSearchParams(location.search);
        const redirectUrl = params.get('redirect');
        if (redirectUrl) {
            navigate(redirectUrl);
        } else {
            navigate('/');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('/auth/login', { name, password });
            const message = await login(name, password);
            if (message) {
                setError(message);
                return;
            }
            // Redirect to another page or update the UI
            setError('');
            handleRedirect();

        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-content">
            <div className="left-panel">
                <img src={img} alt="Welcome" />
            </div>
            <div className="right-panel">
                <div className='right-box'>
                {/* <h2>Login</h2> */}
                <form onSubmit={handleSubmit}>
                    <div className="login-form">
                        <h2>欢迎来到这里</h2>
                        <input
                            type="text"
                            value={name}
                            placeholder='用户名'
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder='密码'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button type="submit">登录</button>
                    </div>
                </form></div>

            </div>
        </div>
    );
};

export default Login;