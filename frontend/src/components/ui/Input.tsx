import { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  id: string;
  label: string;
  error?: string;
  className?: string;
}

export function Input({
  id,
  label,
  error,
  type = 'text',
  className = '',
  ...props
}: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium leading-6">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          className={`block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ${
            error 
              ? 'ring-red-500 focus:ring-red-500' 
              : 'ring-gray-300 focus:ring-indigo-600'
          } focus:ring-2 focus:ring-inset`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
} 