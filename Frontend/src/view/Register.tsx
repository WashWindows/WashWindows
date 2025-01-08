import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css';
import { asyncPost } from '../utils/fetch';
import { auth_api } from '../enum/api';
import Header from '../component/ui/Header';
import { handleLogout } from '../utils/logoutHandler';
import { RegisterForm } from '../component/ui/Form';
import PageContainer from '../component/ui/PageContainer';
import { useAuth } from '../hooks/useAuth';

export const Register: React.FC = () => {
  const { isLoggedIn, user, onLogout } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validInput = (): boolean => {
    if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      setError('請填寫所有欄位');
      return false;
    }
    if (formData.username.length < 6 || formData.username.length > 12) {
      setError('帳號必須介於 6 到 12 個字元');
      return false;
    }
    if (formData.password.length < 8) {
      setError('密碼必須大於 8 位字元');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('密碼與確認密碼不相符');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validInput()) return;

    setIsLoading(true);

    try {
      const response = await asyncPost(auth_api.register, {
        body: {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          userRole: 'user'
        }
      });

      if (response.status !== 200) {
        const errorData = await response.json();
        setError(errorData.message || '註冊失敗');
        return;
      }
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('發生未知錯誤');
      }
    } finally {
      setIsLoading(false);
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
          <h2 className="title">註冊</h2>
          <RegisterForm 
            formData={formData} 
            error={error} 
            isLoading={isLoading} 
            onSubmit={handleSubmit} 
            onChange={handleChange}
          />
        </div>
      </PageContainer>
    </>
  );
};