import {
  DashboardMobileNav,
  DashboardNav,
  DashboardTopNav
} from '@/components/Shared';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for your account.'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const [user] = await Promise.all([getUser(supabase)]);

  if (!user) {
    return redirect('/login');
  }
  return (
    <div className={inter.className}>
      <div>
        <DashboardMobileNav />
        <DashboardNav />
        <div className="lg:pl-72">
          <div>
            <DashboardTopNav />
          </div>
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
