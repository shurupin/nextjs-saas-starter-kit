'use client';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import type { Tables } from '@/types_db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe, createStripePortal } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { RadioGroup } from '@headlessui/react';
import { classNames } from '@/utils/helpers';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PriceWithProduct extends Price {
  products: Product | null;
}

interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = 'lifetime' | 'year' | 'month';

const frequencies = [
  { value: 'month', label: 'Monthly', priceSuffix: '/month' },
  { value: 'year', label: 'Annually', priceSuffix: '/year' }
];

export default function Pricing({ user, products, subscription }: Props) {
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const router = useRouter();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/login');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  const handleStripePortalRequest = async (price: Price) => {
    setPriceIdLoading(price.id);
    const redirectUrl = await createStripePortal(currentPath);
    setPriceIdLoading(undefined);
    return router.push(redirectUrl);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
            Pricing plans for teams of all sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choose an affordable plan that’s packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>

        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={billingInterval}
            onChange={setBillingInterval}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option.value}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-brand-600 text-white' : 'text-gray-500',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>

        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price?.unit_amount || 0) / 100);

            return (
              <div
                key={product.id}
                className={classNames(
                  subscription?.prices?.products?.name === product.name
                    ? 'ring-2 ring-brand-600'
                    : 'ring-1 ring-gray-200',
                  'rounded-3xl p-8 xl:p-10'
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">
                    {product.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {product.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {priceString}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    {billingInterval === 'month' ? '/month' : '/year'}
                  </span>
                </p>
                <Button
                  type="button"
                  loading={priceIdLoading === price.id}
                  onClick={
                    subscription
                      ? () => handleStripePortalRequest(price)
                      : () => handleStripeCheckout(price)
                  }
                  size="sm"
                  className="mt-6 w-full"
                >
                  {subscription ? 'Manage' : 'Subscribe'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
