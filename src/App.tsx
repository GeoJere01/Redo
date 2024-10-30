import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard.tsx';
import { Mentorship } from './pages/Mentorship';
import { Guidelines } from './pages/Guidelines.tsx';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register.tsx';
import { Login } from './pages/Login.tsx';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path = "register" element={<Register/>}/>
            <Route path = "login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
