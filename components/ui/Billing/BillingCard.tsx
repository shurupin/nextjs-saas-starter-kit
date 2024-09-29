'use client';
import { useState } from 'react';
import Button from '../Button';
import { Tables } from '@/types_db';
import { createStripePortal } from '@/utils/stripe/server';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { formatDate } from '@/utils/helpers';

type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null;
      })
    | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}

export default function BillingCard({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <div className="bg-white border border-gray-200 sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          Manage subscription
        </h2>
        <div className="mt-2 max-w-xl text-sm text-gray-600">
          <p>
            {subscription ? (
              <>
                You are currently on the{' '}
                <strong>{subscription?.prices?.products?.name}</strong> plan.
              </>
            ) : (
              'You are not currently subscribed to any plan.'
            )}
          </p>
        </div>
        <div className="flex items-center justify-between mt-5">
          <Button
            loading={isSubmitting}
            size="sm"
            onClick={handleStripePortalRequest}
          >
            {subscription ? 'Manage plan' : 'Choose a plan'}
          </Button>
          {subscription && (
            <p className="mt-2 text-sm text-gray-600">
              Your plan renews on {formatDate(subscription.current_period_end)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
