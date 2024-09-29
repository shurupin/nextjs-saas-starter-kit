import { Register } from '@/components/ui/AuthForms';
import Container from '@/components/ui/Container';
import { checkUserAndRedirect } from '@/utils/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register for a new account'
};

export default async function RegisterPage() {
  await checkUserAndRedirect();
  return (
    <Container>
      <Register redirectMethod="client" />
    </Container>
  );
}
