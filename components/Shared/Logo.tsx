import Image from 'next/image';
import logo from '@/public/logo.svg';

export default function Logo() {
  return <Image alt="Company logo" src={logo} className="w-auto" />;
}
