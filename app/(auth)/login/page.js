'use client'
import LoginFunc from "@/app/(auth)/login/LoginFunc";
import Image from 'next/image';
import { IMAGES } from '@/public/index';
import SiteHeader from '@/_components/layout/booking/SiteHeader';
import siteConfig from '@/config/site';


export default function GuestloginPage () {
  
  const items = [
    { id: 1, name: 'Commercial License' },
    { id: 2, name: 'Unlimited Exports' },
    { id: 3, name: '120+ Coded Blocks' },
    { id: 4, name: 'Design Files Included' },
  ];

    return (
      <>
      <SiteHeader />
        <div className="flex h-screen w-screen pt-12 bg-white/40">
          <div className="w-[45%]">
          <div className="relative w-full h-full rounded-xl">

            <Image
            src={IMAGES.Loginbg}
            fill
            alt="Loginbg"
            sizes="100%"
            style={{
              objectFit: 'cover'
            }}
            className="rounded-xl"
            />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="h-[50%]"></div>
          <div className="h-[50%]">
          <div className="relative">
              <div className="w-full max-w-xl">
                <h3 className="text-4xl font-bold text-white">
                  Login To An Exciting Experience
                </h3>
                <h4 className="text-xl font-bold text-white pt-2">Join The Family Of 400,000+ Happy Customers</h4>
                <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4">
                  {items.map((item) => (
                  <li key={item.id} className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                    <span className="text-lg font-medium text-white"> {item.name} </span>
                  </li>
                   ))}
                </ul>
              </div>
            </div>
          </div>
          </div>
          
          </div>
          <div className="w-[55%] overflow-y-scroll">
            <div className="flex items-center justify-center px-4 py-10">
              <div className="flex flex-col items-center justify-between">
                <h2 className="text-5xl font-bold leading-tight text-gray-500 animate-drip-expand">Welcome to {siteConfig.name}</h2>
                <p className="mt-2 text-sm text-black">
                  <a
                    href="#"
                    title=""
                    className="font-semibold text-black transition-all duration-200"
                  >
                    Please Enter your details in the form below
                  </a>
                </p>
                <div className="w-96">
              < LoginFunc />
                </div>
              </div>
            </div>

            






          </div>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          <div className="relative flex h-screen items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
            <div className="absolute inset-0">
              <Image src={IMAGES.Loginbg} alt="Loginbg" width={500} height={500} className="h-full w-full rounded-xl object-cover " />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="relative">
              <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
                <h3 className="text-4xl font-bold text-white">
                  Login To An Exciting Experience
                </h3>
                <h4 className="text-xl font-bold text-white pt-2">Join The Family Of 400,000+ Happy Customers</h4>
                <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {items.map((item) => (
                  <li key={item.id} className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                    <span className="text-lg font-medium text-white"> {item.name} </span>
                  </li>
                   ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">Welcome to {siteConfig.name}</h2>
              <p className="mt-2 text-sm text-black">
                <a
                  href="#"
                  title=""
                  className="font-semibold text-foreground transition-all duration-200"
                >
                  Please Enter your details in the form below
                </a>
              </p>

              < LoginFunc />

            </div>
          </div>
        </div>
      </div> */}
        </>
    )
};