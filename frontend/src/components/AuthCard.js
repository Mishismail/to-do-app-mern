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
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login(email, password);
                setAlert({ type: 'success', message: 'Logged in successfully!' });
            } else {
                await signup(name, surname, email, password);
                setAlert({ type: 'success', message: 'Registered successfully!' });
            }
            setTimeout(() => {
                setAlert(null);
                navigate('/');
            }, 2000);
        } catch (error) {
            setAlert({ type: 'error', message: 'Invalid username or password' });
        }
    };

    return (
        <div className="main-container varela-round-regular">
            <div className="main">
                {alert && (
                    <div className={`alert ${alert.type}`}>
                        {alert.message}
                        <span className="closebtn" onClick={() => setAlert(null)}>&times;</span>
                    </div>
                )}
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