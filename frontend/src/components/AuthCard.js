import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthCard.css';

const AuthCard = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(name, surname, email, password);
            }
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="main-container">
            <div className="main">
                {isLogin ? (
                    <div className="login">
                        <form className="form" onSubmit={handleSubmit}>
                            <label htmlFor="chk" aria-hidden="true">Log in</label>
                            <input
                                className="input"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="input"
                                type="password"
                                name="pswd"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Log in</button>
                            <p>Don't have an account? <span onClick={() => setIsLogin(false)}>Register</span></p>
                        </form>
                    </div>
                ) : (
                    <div className="register">
                        <form className="form" onSubmit={handleSubmit}>
                            <label htmlFor="chk" aria-hidden="true">Register</label>
                            <input
                                className="input"
                                type="text"
                                name="name"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                className="input"
                                type="text"
                                name="surname"
                                placeholder="Surname"
                                required
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                            <input
                                className="input"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="input"
                                type="password"
                                name="pswd"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Register</button>
                            <p>Already have an account? <span onClick={() => setIsLogin(true)}>Log in</span></p>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthCard;