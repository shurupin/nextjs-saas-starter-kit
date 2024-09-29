'use client';
import { dashboardConfig } from '@/config/dashboard';
import { classNames, currentPath } from '@/utils/helpers';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild
} from '@headlessui/react';
import { useState } from 'react';
import { HiCog6Tooth, HiXMark } from 'react-icons/hi2';
import useStore from '@/store/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Image from 'next/image';

export default function DashboardMobileNav() {
  const { sidebarOpen, setSidebarOpen } = useStore();

  const pathname = usePathname();

  return (
    <Dialog
      open={sidebarOpen}
      onClose={setSidebarOpen}
      className="relative z-50 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex">
        <DialogPanel
          transition
          className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
        >
          <TransitionChild>
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
              <button
                type="button"
                onClick={setSidebarOpen}
                className="-m-2.5 p-2.5"
              >
                <span className="sr-only">Close sidebar</span>
                <HiXMark aria-hidden="true" className="h-6 w-6 text-white" />
              </button>
            </div>
          </TransitionChild>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
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
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-brand-600"
                  >
                    <HiCog6Tooth
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-brand-600"
                    />
                    Settings
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
