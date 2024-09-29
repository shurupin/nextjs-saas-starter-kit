import { HiBell } from 'react-icons/hi2';

export default function DashboardNotifications() {
  return (
    <button
      type="button"
      className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
    >
      <span className="sr-only">View notifications</span>
      <HiBell aria-hidden="true" className="h-6 w-6" />
    </button>
  );
}
