import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 focus:ring-blue-400";
    const variantStyles = {
        primary: "bg-blue-500 hover:bg-blue-700 text-white",
        secondary: "bg-gray-500 hover:bg-gray-700 text-white",
        danger: "bg-red-500 hover:bg-red-700 text-white"
    };

    return (
        <button
            className={`${baseStyle} ${variantStyles[variant]} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;