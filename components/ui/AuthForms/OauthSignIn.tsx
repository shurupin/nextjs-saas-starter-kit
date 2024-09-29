'use client';
import { signInWithOAuth } from '@/utils/auth-helpers/client';
import { type Provider } from '@supabase/supabase-js';
import { FcGoogle } from 'react-icons/fc';
import Button from '../Button';

export default function OauthSignIn() {
  const handleSubmit = async (provider: Provider) => {
    await signInWithOAuth(provider);
  };

  return (
    <>
      <Button
        className=" w-full text-base font-semibold leading-6 bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 focus-visible:outline-brand-600"
        onClick={() => handleSubmit('google')}
      >
        <FcGoogle className="mr-3 w-6 h-6" />
        Sign in with Google
      </Button>
    </>
  );
}
