import React from 'react';
import Button from './Button';
import { LuLoader2 } from 'react-icons/lu';

type ButtonProps = {
  page?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const ButtonLoading = ({ page, size }: ButtonProps) => {
  return (
    <Button size={size} className="w-full leading-6" disabled>
      <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
      {page}
    </Button>
  );
};

export default ButtonLoading;
