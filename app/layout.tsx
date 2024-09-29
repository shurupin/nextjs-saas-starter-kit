import { Metadata } from 'next';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';
import PlausibleProvider from 'next-plausible';
import { Inter } from 'next/font/google';

const title = 'Next.js Subscription Starter';
const description = 'Brought to you by Vercel, Stripe, and Supabase.';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider
          domain={
            process.env.NEXT_PUBLIC_SITE_URL ||
            'nextjs-saas-starter-kit.vercel.app'
          }
          taggedEvents={true}
        />
      </head>
      <body className={inter.className}>
        {/* <Navbar /> */}
        <main>{children}</main>
        {/* <Footer /> */}
        <Suspense>
          <Toaster />
        </Suspense>{' '}
      </body>
    </html>
  );
}
