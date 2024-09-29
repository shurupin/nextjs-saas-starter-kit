import { UpdatePassword } from '@/components/ui/AuthForms';
import Container from '@/components/ui/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password'
};

export default async function ResetPasswordPage() {
  return (
    <Container>
      <UpdatePassword redirectMethod="client" />
    </Container>
  );
}
