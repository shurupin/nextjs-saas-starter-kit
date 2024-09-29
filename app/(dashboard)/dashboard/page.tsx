import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page'
};

export default async function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Page</h1>
    </div>
  );
}
