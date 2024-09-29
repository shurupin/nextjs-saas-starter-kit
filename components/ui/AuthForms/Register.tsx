'use client';
import OauthSignIn from '@/components/ui/AuthForms/OauthSignIn';
import { handleRequest } from '@/utils/auth-helpers/client';
import { signUp } from '@/utils/auth-helpers/server';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '../Input';
import Label from '../Label';
import Button from '../Button';
import Logo from '@/components/Shared/Logo';
import { registerSchema } from '@/validations/auth';
import { MdErrorOutline } from 'react-icons/md';

// Define prop type with allowEmail boolean
interface PasswordSignInProps {
  redirectMethod: string;
}

type FormFields = z.infer<typeof registerSchema>;

export default function Register({ redirectMethod }: PasswordSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await handleRequest(data, signUp, router);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center">
          <Logo />
        </div>
        <h2 className="mt-6 text-center sm:text-3xl text-2xl font-semibold text-gray-900 leading-9">
          Register an account
        </h2>
        <p className="text-center mt-3 text-gray-600 leading-6">
          Please enter your details to create an account.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 sm:rounded-lg sm:px-12">
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

            <div>
              <Button
                type="submit"
                loading={isSubmitting}
                className="w-full mb-4"
              >
                Sign up
              </Button>
              <OauthSignIn />
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-500 font-normal">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold leading-6 text-brand-600 hover:text-brand-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
