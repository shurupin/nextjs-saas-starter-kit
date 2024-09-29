import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

type LabelProps = React.HTMLAttributes<HTMLLabelElement> & {
  htmlFor: string;
};

export default function Label({ className, htmlFor, ...props }: LabelProps) {
  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className={cn(labelVariants(), className)}
    />
  );
}

const labelVariants = cva('block text-sm font-medium leading-5 text-gray-700');
