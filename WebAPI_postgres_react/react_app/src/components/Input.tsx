import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
    return (
        <>
            {label && (
                <label className="block text-white text-sm font-bold mb-2" htmlFor={props.id}>
                    {label}
                </label>
            )}
            <input
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 focus:ring-blue-400 ${className}`}
                {...props}
            />
        </>
    );
};

export default Input;