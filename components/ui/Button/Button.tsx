import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { LuLoader2 } from 'react-icons/lu';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export default function Button({
  className,
  variant,
  size,
  disabled = false,
  loading = false,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {loading && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
      {props.children}
    </button>
  );
}

const buttonVariants = cva(
  'inline-flex justify-center items-center font-semibold text-white shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-600 hover:bg-brand-700 focus-visible:outline-brand-600',
        secondary:
          'bg-white hover:bg-gray-50 text-gray-900 ring-1 ring-inset ring-gray-300',
        destructive: 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600'
      },
      size: {
        xs: 'px-3 py-2 text-sm rounded-lg',
        sm: 'px-3.5 py-2.5 text-sm rounded-lg',
        md: 'px-4 py-2.5 text-base rounded-lg',
        lg: 'px-4.5 py-3 text-base rounded-lg'
        // xl: 'px-3.5 py-2.5 text-sm rounded-md'
      }
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);
