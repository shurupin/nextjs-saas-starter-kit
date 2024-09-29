import { DashboardHeader } from '@/components/Shared';
import { AccountSettingsForm } from '@/components/ui/AccountForms';
import { getUser, getUserDetails } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Update your account settings.'
};

export default async function AccountSettingsPage() {
  const supabase = createClient();
  const [user, userDetails] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase)
  ]);

  if (!user) {
    return redirect('/login');
  }

  return (
    <div>
      <DashboardHeader
        title="Account Settings"
        description="Update your account settings."
      />
      <AccountSettingsForm
        userEmail={user.email}
        userName={userDetails?.full_name ?? ''}
      />
    </div>
  );
}
