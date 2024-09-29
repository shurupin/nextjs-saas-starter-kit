'use client';
import DashboardNotifications from './DashboardNotifications';
import DashboardProfileDropdown from './DashboardProfileDropdown';
import DashboardSearch from './DashboardSearch';
import HamburgerMenu from './HamburgerMenu';
import { dashboardConfig } from '@/config/dashboard';

export default function DashboardTopNav() {
  return (
    <div className="sticky flex lg:hidden top-0 z-40  h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <HamburgerMenu />

      {/* Separator */}
      <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <DashboardSearch />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* <DashboardNotifications /> */}

          {/* Separator */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
          />

          {/* <DashboardProfileDropdown
            userNavigation={dashboardConfig.userNavigation}
          /> */}
        </div>
      </div>
    </div>
  );
}
