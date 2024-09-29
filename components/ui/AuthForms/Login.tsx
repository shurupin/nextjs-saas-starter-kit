'use client';
import OauthSignIn from '@/components/ui/AuthForms/OauthSignIn';
import { handleRequest } from '@/utils/auth-helpers/client';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import { LoginSchema } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../Button';
import Input from '../Input';
import Label from '../Label';
import { Logo } from '@/components/Shared';
import { MdErrorOutline } from 'react-icons/md';

// Define prop type with allowEmail boolean
interface PasswordSignInProps {
  redirectMethod: string;
}

type FormFields = z.infer<typeof LoginSchema>;

export default function Login({ redirectMethod }: PasswordSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    resolver: zodResolver(LoginSchema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await handleRequest(data, signInWithPassword, router);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center">
          <Logo />
        </div>
        <h2 className="mt-6 text-center sm:text-3xl text-2xl font-semibold text-gray-900 leading-9">
          Log in to your account
        </h2>
        <p className="text-center mt-3 text-gray-600 leading-6">
          Welcome back! Please enter your details.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 sm:px-12">
          <form
            noValidate={true}
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-2">
                <Input
                  {...register('email')}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  variant={errors.email && 'error'}
                />
                {errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <MdErrorOutline
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-2 text-sm text-red-600"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Input
                  {...register('password')}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••"
                  variant={errors.password && 'error'}
                />
                {errors.password && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <MdErrorOutline
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-2 text-sm text-red-600"
                  role="alert"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <div className="text-sm leading-5">
                <Link
                  href="/reset-password"
                  className="font-semibold text-brand-600 hover:text-indigo-500"
                >
                  Forgot password
                </Link>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                loading={isSubmitting}
                className="w-full mb-4"
              >
                Sign in
              </Button>
              <OauthSignIn />
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-500 font-normal">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-semibold leading-6 text-brand-600 hover:text-brand-700 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
