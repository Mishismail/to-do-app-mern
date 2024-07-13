import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users', { name, email, password });
            localStorage.setItem('token', data.token);
            history.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;