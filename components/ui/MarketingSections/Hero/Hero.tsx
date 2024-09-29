import Image from 'next/image';

export default function Hero() {
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 items-center">
          <div className="px-6 lg:px-0">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <div className="mt-24 sm:mt-32 lg:mt-16">
                  {/* <a href="#" className="inline-flex space-x-6">
                    <span className="rounded-full bg-brand-600/10 px-3 py-1 text-sm font-semibold leading-6 text-brand-600 ring-1 ring-inset ring-brand-600/10">
                      What's new
                    </span>
                    <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                      <span>Just shipped v0.1.0</span>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </a> */}
                </div>
                <h1 className="mt-10 text-4xl font-extrabold  text-gray-900 sm:text-6xl">
                  Streamline your projects
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-500">
                  Manage tasks, collaborate with your team, and hit your
                  deadlines—all in one place.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-brand-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    Get started today
                  </a>
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Image
            width="0"
            height="0"
            src="https://tailwindui.com/img/component-images/top-nav-with-multi-column-layout-screenshot.jpg"
            alt="hero"
            className="object-cover w-full h-full lg:h-auto lg:w-full"
          />
        </div>
      </div>
    </div>
  );
}
