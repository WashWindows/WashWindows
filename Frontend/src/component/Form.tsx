import React from 'react';
import { Button } from './Button';
import '../style/Form.css';

interface FormInputProps {
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
    type,
    name,
    placeholder,
    value,
    onChange,
    required,
    minLength,
    maxLength
}) => (
    <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
    />
);

interface LoginFormProps {
    email: string;
    password: string;
    error: string;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    email,
    password,
    error,
    onSubmit,
    onChange
}) => (
    <form onSubmit={onSubmit}>
        <FormInput
            type="email"
            name="email"
            placeholder="電子郵件"
            value={email}
            onChange={onChange}
            required
        />
        <FormInput
            type="password"
            name="password"
            placeholder="密碼"
            value={password}
            onChange={onChange}
            required
        />
        {error && <div className="error-message">{error}</div>}
        <Button type="submit" variant="primary">
            登入
        </Button>
    </form>
);

interface RegisterFormProps {
    formData: {
        email: string;
        username: string;
        password: string;
        confirmPassword: string;
    };
    error: string | null;
    isLoading: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
    formData,
    error,
    isLoading,
    onSubmit,
    onChange
}) => (
    <form onSubmit={onSubmit}>
        <FormInput
            type="email"
            name="email"
            placeholder="電子郵件"
            value={formData.email}
            onChange={onChange}
            required
        />
        <FormInput
            type="text"
            name="username"
            placeholder="帳號"
            value={formData.username}
            onChange={onChange}
            required
            minLength={6}
            maxLength={12}
        />
        <FormInput
            type="password"
            name="password"
            placeholder="密碼"
            value={formData.password}
            onChange={onChange}
            required
            minLength={6}
            maxLength={12}
        />
        <FormInput
            type="password"
            name="confirmPassword"
            placeholder="確認密碼"
            value={formData.confirmPassword}
            onChange={onChange}
            required
            minLength={6}
            maxLength={12}
        />
        {error && <p className="error-message">{error}</p>}
        <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? '註冊中...' : '註冊'}
        </Button>
    </form>
);

interface PasswordFormProps {
    passwordInput: {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    };
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCancel: () => void;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
    passwordInput,
    onSubmit,
    onChange,
    onCancel
}) => (
    <form onSubmit={onSubmit}>
        <div className="modal-input-group">
            <label>舊密碼</label>
            <FormInput
                type="password"
                name="oldPassword"
                placeholder=""
                value={passwordInput.oldPassword}
                onChange={onChange}
                required
            />
        </div>
        <div className="modal-input-group">
            <label>新密碼</label>
            <FormInput
                type="password"
                name="newPassword"
                placeholder=""
                value={passwordInput.newPassword}
                onChange={onChange}
                required
                minLength={6}
                maxLength={12}
            />
        </div>
        <div className="modal-input-group">
            <label>確認密碼</label>
            <FormInput
                type="password"
                name="confirmPassword"
                placeholder=""
                value={passwordInput.confirmPassword}
                onChange={onChange}
                required
                minLength={6}
                maxLength={12}
            />
        </div>
        <div className="modal-actions">
            <Button type="submit" variant="secondary">
                確定
            </Button>
            <Button type="button" variant="danger" onClick={onCancel}>
                取消
            </Button>
        </div>
    </form>
);

interface DeleteAccountFormProps {
    password: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({
    password,
    onChange,
    onSubmit,
    onCancel
}) => (
    <form onSubmit={onSubmit}>
        <p>您確定要刪除帳號嗎？此操作無法恢復。</p>
        <div className="modal-input-group">
            <label>請輸入密碼以確認</label>
            <FormInput
                type="password"
                name="oldPassword"
                placeholder="請輸入密碼"
                value={password}
                onChange={onChange}
                required
            />
        </div>
        <div className="modal-actions">
            <Button variant="secondary" type="submit">
                刪除
            </Button>
            <Button 
                variant="danger" 
                type="button"
                onClick={onCancel}
            >
                取消
            </Button>
        </div>
    </form>
);