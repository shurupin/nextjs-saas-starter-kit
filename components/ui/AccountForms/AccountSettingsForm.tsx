'use client';
import { useRouter } from 'next/navigation';
import Button from '../Button';
import Input from '../Input';
import Label from '../Label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateAccountDetails } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountSettingsSchema } from '@/validations/auth';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';

// Define prop type with allowEmail boolean
type AccountSettingsProps = {
  userEmail: string | undefined;
  userName: string;
};

type FormFields = z.infer<typeof AccountSettingsSchema>;

export default function AccountSettingsForm({
  userEmail,
  userName
}: AccountSettingsProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await handleRequest(data, updateAccountDetails, router);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    resolver: zodResolver(AccountSettingsSchema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          {...register('name')}
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          defaultValue={userName}
          variant={errors.name && 'error'}
          className="w-1/3 mt-2"
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-red-600 my-2" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          {...register('email')}
          id="email"
          name="email"
          type="text"
          variant={errors.email && 'error'}
          placeholder="markevans@gmail.com"
          defaultValue={userEmail ?? ''}
          className="w-1/3 mt-2"
        />
        {errors.email && (
          <p
            id="email-error"
            className="mt-2 text-sm text-red-600 my-2"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>
      <Button type="submit" loading={isSubmitting}>
        Save changes
      </Button>
    </form>
  );
}
