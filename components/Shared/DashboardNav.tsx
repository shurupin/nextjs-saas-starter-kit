'use client';
import { dashboardConfig } from '@/config/dashboard';
import { classNames, currentPath } from '@/utils/helpers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Image from 'next/image';

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Logo />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {dashboardConfig.navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          currentPath(item.href) === currentPath(pathname)
                            ? 'bg-gray-50 text-gray-800 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-800',
                          'group flex gap-x-3 rounded-md p-2 text-base font-semibold leading-6'
                        )}
                      >
                        <Image
                          src={item.icon}
                          alt={item.name + ' icon'}
                          width={24}
                          height={24}
                          aria-hidden="true"
                          className="shrink-0 text-red-500"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* <li className="mt-auto">
                <Link
                  href="/settings"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-brand-600"
                >
                  <HiCog6Tooth
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-brand-600"
                  />
                  Settings
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
