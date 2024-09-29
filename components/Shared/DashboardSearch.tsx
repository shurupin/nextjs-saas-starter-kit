import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function DashboardSearch() {
  return (
    <form action="#" method="GET" className="relative flex flex-1 invisible">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <HiMagnifyingGlass
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
      />
      <input
        id="search-field"
        name="search"
        type="search"
        placeholder="Search..."
        className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
      />
    </form>
  );
}
