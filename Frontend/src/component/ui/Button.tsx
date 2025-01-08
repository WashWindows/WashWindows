import React from 'react';
import '../../style/Button.css';

type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'danger';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    children,
}) => {
    const baseClass = `custom-button ${variant} ${className}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={baseClass}
        >
            {children}
        </button>
    );
};