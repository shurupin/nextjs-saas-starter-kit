import React from 'react';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'default' | 'error';
  isInvalid?: boolean;
  type?: 'text' | 'email' | 'password';
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, isInvalid = false, type, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type={type}
        aria-invalid={isInvalid}
        aria-describedby={isInvalid ? `${props.id}-error` : undefined}
        className={cn(inputVariants({ variant }), className)}
      />
    );
  }
);

const inputVariants = cva(
  'block w-full rounded-lg border-0 py-2.5 px-3.5 text-gray-900 ring-1 text-base ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset transition shadow-sm',
  {
    variants: {
      variant: {
        default: 'focus:ring-brand-600',
        error: 'ring-red-300 focus:ring-red-500 focus:ring-2'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export default Input;
