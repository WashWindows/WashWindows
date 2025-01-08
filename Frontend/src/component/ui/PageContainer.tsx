import React from 'react';
import '../../style/PageContainer.css';

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'auth' | 'game' | 'dashboard';
}

export const PageContainer: React.FC<PageContainerProps> = ({
    children,
    className = '',
    variant = 'dashboard'
}) => {
    return (
        <div className={`page-container ${variant} ${className}`}>
            {children}
        </div>
    );
};

export default PageContainer;