'use client';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function GlobalError() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-brand-600">500</p>
        <h1 className="mt-4 text-3xl font-bold  text-gray-900 sm:text-5xl">
          Internal server error
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, something went wrong on our end.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/">
            <Button size="sm">Go back home</Button>
          </Link>
          <a
            href={`mailto:${process.env.COMPANY_EMAIL}`}
            className="text-sm font-semibold text-gray-900"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
