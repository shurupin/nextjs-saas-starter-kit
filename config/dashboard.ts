import { FiHome } from 'react-icons/fi';
import { LuCreditCard } from 'react-icons/lu';
import { FiSettings } from 'react-icons/fi';
import { HiOutlineSupport } from 'react-icons/hi';
import DashboardIcon from '@/public/bar-chart-square-02.svg';
import SettingsIcon from '@/public/settings-01.svg';
import CreditCardIcon from '@/public/credit-card-01.svg';
import SupportIcon from '@/public/life-buoy-01.svg';

export const dashboardConfig = {
  navigation: [
    { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
    {
      name: 'Billing',
      href: '/dashboard/billing',
      icon: CreditCardIcon
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: SettingsIcon
    },
    {
      name: 'Support',
      href: `mailto:${process.env.COMPANY_EMAIL}`,
      icon: SupportIcon
    }
  ]
};
