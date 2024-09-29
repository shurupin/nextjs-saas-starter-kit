import { Login } from '@/components/ui/AuthForms';
import Container from '@/components/ui/Container';
import { checkUserAndRedirect } from '@/utils/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
};

export default async function LoginPage() {
  await checkUserAndRedirect();

  return (
    <Container>
      <Login redirectMethod="client" />
    </Container>
  );
}
