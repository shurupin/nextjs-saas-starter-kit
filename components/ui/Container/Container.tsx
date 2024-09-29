// components/ui/Container.tsx
import React from 'react';
import { cn } from '@/utils/cn'; // Utility function for conditional classes

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Container.displayName = 'Container';

export default Container;
