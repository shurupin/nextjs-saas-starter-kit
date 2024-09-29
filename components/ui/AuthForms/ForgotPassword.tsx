'use client';
import Button from '@/components/ui/Button';
import { requestPasswordUpdate } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Label from '../Label';
import Input from '../Input';
import { forgotPasswordSchema } from '@/validations/auth';
import { Logo } from '@/components/Shared';
import { MdErrorOutline } from 'react-icons/md';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import KeyIcon from '@/public/key-01.svg';

// Define prop type with allowEmail boolean
interface ForgotPasswordProps {
  redirectMethod: string;
  disableButton?: boolean;
}

type FormFields = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword({
  redirectMethod,
  disableButton
}: ForgotPasswordProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await handleRequest(data, requestPasswordUpdate, router);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-14 h-14 block mx-auto flex items-center justify-center border border-gray-200 rounded-xl shadow-xs">
          <Image src={KeyIcon} alt="key icon" width={28} height={28} />
        </div>
        <h2 className="mt-6 text-center sm:text-3xl text-2xl font-semibold text-gray-900 leading-9">
          Forgot password?
        </h2>
        <p className="text-center mt-3 text-gray-600 leading-6">
          No worries, we'll send you reset instructions.
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
              <Button
                type="submit"
                disabled={disableButton}
                loading={isSubmitting}
                className="w-full"
              >
                Send link to email
              </Button>
            </div>
          </form>
          <Link
            href="/login"
            className="flex font-semibold items-center mt-7 justify-center text-sm text-gray-600"
          >
            <span>
              <FiArrowLeft className="mr-2" />
            </span>
            Back to log in
          </Link>
        </div>
      </div>
    </>
  );
}
