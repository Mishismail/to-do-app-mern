import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthCard from './components/AuthCard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <main>
            <Routes>
                <Route path="/auth" element={<AuthCard />} />
                <Route path="/" element={<ProtectedRoute element={HomePage} />} />
            </Routes>
        </main>
    );
}

export default App;