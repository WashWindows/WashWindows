import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css';
import { auth_api } from '../enum/api';
import { asyncPost } from '../utils/fetch';
import Header from '../component/ui/Header';
import { handleLogout } from '../utils/logoutHandler';
import { LoginForm } from '../component/ui/Form';
import PageContainer from '../component/ui/PageContainer';
import { useAuth } from '../hooks/useAuth';

export const Login: React.FC = () => {
  const { isLoggedIn, user, setUser, onLogout } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await asyncPost(auth_api.login, {
        body: formData
      });
      
      const data = await response.json();
      
      if (data.code === 200) {
        localStorage.setItem('token', data.body.token);
        localStorage.setItem('user', JSON.stringify(data.body.user));
        setUser(data.body.user);
        navigate('/#');
      } else {
        setError(data.message || '登入失敗，請檢查帳號密碼');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('登入時發生錯誤，請稍後再試');
    }
  };

  return (
    <>
      <Header 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={() => handleLogout(onLogout)} 
      />
      <PageContainer variant='auth'>
        <div className="form-container">
          <h2 className="title">登入</h2>
          <LoginForm
            email={formData.email}
            password={formData.password}
            error={error}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </div>
      </PageContainer>
    </>
  );
};