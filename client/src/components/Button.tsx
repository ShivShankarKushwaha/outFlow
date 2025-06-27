import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  let baseClasses = "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

  if (variant === 'primary') {
    baseClasses += " bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500";
  } else if (variant === 'secondary') {
    baseClasses += " bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500";
  } else if (variant === 'danger') {
    baseClasses += " bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
