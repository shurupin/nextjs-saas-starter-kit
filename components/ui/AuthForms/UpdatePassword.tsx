'use client';
import Button from '@/components/ui/Button';
import { updatePassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import Label from '../Label';
import Input from '../Input';
import { HiExclamationCircle } from 'react-icons/hi2';
import { updatePasswordSchema } from '@/validations/auth';
import { Logo } from '@/components/Shared';
import { MdErrorOutline } from 'react-icons/md';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import LockIcon from '@/public/lock-01.svg';

interface UpdatePasswordProps {
  redirectMethod: string;
}

type FormFields = z.infer<typeof updatePasswordSchema>;

export default function UpdatePassword({
  redirectMethod
}: UpdatePasswordProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    resolver: zodResolver(updatePasswordSchema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await handleRequest(data, updatePassword, router);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-14 h-14 block mx-auto flex items-center justify-center border border-gray-200 rounded-xl shadow-xs">
          <Image src={LockIcon} alt="key icon" width={28} height={28} />
        </div>
        <h2 className="mt-6 text-center sm:text-3xl text-2xl font-semibold text-gray-900 leading-9">
          Set new password
        </h2>
        <p className="text-center mt-3 text-gray-600 leading-6">
          Please enter your new password.
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
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative mt-2">
                <Input
                  {...register('confirmPassword')}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••"
                  variant={errors.confirmPassword && 'error'}
                />
                {errors.confirmPassword && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <MdErrorOutline
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.confirmPassword && (
                <p
                  id="confirm-password-error"
                  className="mt-2 text-sm text-red-600"
                  role="alert"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <Button type="submit" loading={isSubmitting} className="w-full">
                Reset password
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
