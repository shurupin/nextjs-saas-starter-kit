import { DashboardHeader } from '@/components/Shared';
import { BillingCard } from '@/components/ui/Billing';
import { getSubscription, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage your billing information.'
};

const BillingPage = async () => {
  const supabase = createClient();
  const [user, subscription] = await Promise.all([
    getUser(supabase),
    getSubscription(supabase)
  ]);

  if (!user) {
    return redirect('/login');
  }
  return (
    <div>
      <DashboardHeader
        title="Billing"
        description="Manage your billing information."
      />
      <BillingCard subscription={subscription} />
    </div>
  );
};

export default BillingPage;
