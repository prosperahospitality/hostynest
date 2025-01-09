'use client'
import React from 'react'
import Image from 'next/image'
import { IMAGES } from '@/public/index'
import { Badge } from "@/_components/ui/Badge"
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon, FullLogo } from "@/_components/icon"
import { Button, Divider } from '@nextui-org/react'
import Link from 'next/link'
import siteConfig from "@/config/site";
import { usePathname } from "next/navigation";


export default function SiteFooter() {
  const pathname = usePathname();

  return (
    <footer className="w-screen h-fit bg-white">
      <div className="w-[95%] mx-auto pt-10">
        <div className="mx-auto flex max-w-full items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <FullLogo height={40} width={200}/>
            <h4>India&apos;s Most Trusted Travel <span className='text-primary font-semibold italic'>Booking Platform</span></h4>
          </div>
          <div className="flex items-center gap-4">
            <h4>Let&apos;s Grow Together !</h4>
            <Button variant='shadow' color='primary' size='md'
            >
              Get Started 🚀
            </Button>
          </div>
        </div>
        <Divider className='w-full bg-gray-300' />
        <div className='grid grid-cols-2 pt-4 gap-2'>
          <div className='pr-12'>
            <h3 className='text-gray-700 font-semibold text-base'>Why Choose HostyNest ?</h3>
            <h6 className='text-gray-500 text-sm'>
              HostyNest has swiftly emerged as a trusted industry leader, renowned for it&apos;s exceptional offers, competitive rates, and seamless booking experience. Whether booking flights, hotels, or holiday packages, our desktop site & mobile app ensure effortless transactions with no complications. Our array of exclusive deals, including instant Discounts, Fare Calendar, Rewards Program & Wallet, are continuously updated to cater to our customer&apos;s evolving preferences. Join HostyNest today for unparalleled convenience and satisfaction in every booking.
            </h6>
          </div>
          <div className='pl-10'>
            <h3 className='text-gray-700 font-semibold text-base'>How to find the cheapest hotel deals in any city ?</h3>
            <h6 className='text-gray-500 text-sm'>
              HostyNest being the best hotel-booking site in the country, offers several discounts on budget hotels as well. If you are looking for the cheapest hotels with amazing deals on the app, you can tap on Sort & Filter option and drag down the price option from Rs.0 to Rs.500 or from Rs.0 to Rs.1000. Choose from the various amenities you would need during your stay including access to Wi-Fi, room service & in-house restaurants. The list will first show you the cheapest one on top. You can also sort by prices from low to high, scroll down the list & find your preferred ones with great discounts.
            </h6>
          </div>
          <div className='pr-12'>
            <h3 className='text-gray-700 font-semibold text-base'>How to book a hotel online with HostyNest ?</h3>
            <h6 className='text-gray-500 text-sm'>
              Booking a hotel is very easy on the HostyNest Website, You can use the search bar and click on various top location listed via images on the home page. Finalise your location, choose your stay using filters and sort properties and tadaaa! Your Stay has been booked.
            </h6>
          </div>
          <div className='pl-10'>
            <h3 className='text-gray-700 font-semibold text-base'>How to Find Best Hotel Near me ?</h3>
            <h6 className='text-gray-500 text-sm'>
              Any location you&apos;re traveling in, HostyNest provides you with best hotels and at affordable rates on hourly stay and full stay basis, our algorithm detects best hotels nearby and gives you suggestions accordingly.
            </h6>
          </div>
        </div>
        <Divider className='w-full mt-4 bg-gray-300' />
        <div className="w-full pt-4 grid grid-cols-7">
          <div className="h-full">
            <h3 className="tracking-px mb-2 text-base font-semibold uppercase text-black/50">
              Quick Links
            </h3>
            <ul className="flex flex-col justify-start ml-2">
              {siteConfig.QuickLinks.map((item) => (
                <div key={item.href}>
                  <Link
                    className={`link ${
                      pathname === item.href
                        ? "text-primary font-extralight"
                        : "text-gray-600 font-extralight text-sm"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          {/* ###2 */}
          <div className="h-full">
            <h3 className="tracking-px mb-2 text-base font-semibold uppercase text-black/50">
              Terms & Conditions
            </h3>
            <ul className="flex flex-col justify-start ml-2">
              {siteConfig.TermsConditions.map((item) => (
                <div key={item.href}>
                  <Link
                    className={`link ${
                      pathname === item.href
                        ? "text-primary font-extralight"
                        : "text-gray-600 font-extralight text-sm"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          {/* ####3 */}
          <div className="h-full">
            <h3 className="tracking-px mb-2 text-base font-semibold uppercase text-black/50">
              About Us
            </h3>
            <ul className="flex flex-col justify-start ml-2">
              {siteConfig.AboutUs.map((item) => (
                <div key={item.href}>
                  <Link
                    className={`link ${
                      pathname === item.href
                        ? "text-primary font-extralight"
                        : "text-gray-600 font-extralight text-sm"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          {/* ####4 */}
          <div className="h-full">
            <h3 className="tracking-px mb-2 text-base font-semibold uppercase text-black/50">
              Explore India
            </h3>
            <ul className="flex flex-col justify-start ml-2">
              {siteConfig.ExploreIndia.map((item) => (
                <div key={item.href}>
                  <Link
                    className={`link ${
                      pathname === item.href
                        ? "text-primary font-extralight"
                        : "text-gray-600 font-extralight text-sm"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          {/* #####5 */}
          <div className="h-full">
            <h3 className="tracking-px mb-2 text-base font-semibold uppercase text-black/50">
              Stay With Us
            </h3>
            <ul className="flex flex-col justify-start ml-2">
              {siteConfig.StayWithUs.map((item) => (
                <div key={item.href}>
                  <Link
                    className={`link ${
                      pathname === item.href
                        ? "text-primary font-extralight"
                        : "text-gray-600 font-extralight text-sm"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          {/* ####6 */}
          <div className="h-full">
            <h3 className="tracking-px mb-2 text-base font-semibold uppercase text-black/50">
              Popular Acticities
            </h3>
            <ul className="flex flex-col justify-start ml-2">
              {siteConfig.PopularActicities.map((item) => (
                <div key={item.href}>
                  <Link
                    className={`link ${
                      pathname === item.href
                        ? "text-primary font-extralight"
                        : "text-gray-600 font-extralight text-sm"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          {/* #####7 */}
          <div className="h-full">
            <h3 className="tracking-px mb-2 text-base font-semibold uppercase text-black/50">
              Recommended Hotels
            </h3>
            <ul className="flex flex-col justify-start ml-2">
              {siteConfig.RecommendedHotels.map((item) => (
                <div key={item.href}>
                  <Link
                    className={`link ${
                      pathname === item.href
                        ? "text-primary font-extralight"
                        : "text-gray-600 font-extralight text-sm"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <Divider className='w-full mt-4 bg-gray-300' />
        <div className='w-[50%] mt-4 mb-4 grid grid-cols-2'>
          <div className='pr-16 '>
            <h4 className='text-base text-black/50 font-semibold mb-3'>Contact Us</h4>
            <h6 className='text-xs text-gray-500'>
              1204, The Affaires <br />Palm Paradise, Plam Beach Rd, Sector 17, Sanpada, Navi Mumbai, Maharashtra 400 705
            </h6>
            <h6 className='text-xs text-gray-500'>Email - admin@krafitechsolution.com</h6>
            <h6 className='text-xs text-gray-500'>Phone no. - <b>+91</b> 90823 61628</h6>
          </div>
          <div>
            <h3 className="tracking-px mb-3 text-base font-semibold text-black/50" href="#">
              Stay Connected
            </h3>
            <div className="flex flex-wrap justify-between items-center w-[60%]">
              <div >
                <a href={siteConfig.links.facebook}>
                  <div className="flex size-8">
                    <FacebookIcon />
                  </div>
                </a>
              </div>
              <div >
                <a href={siteConfig.links.twitter}>
                  <div className="flex size-6">
                    <TwitterIcon />
                  </div>
                </a>
              </div>
              <div >
                <a href={siteConfig.links.instagram}>
                  <div className="flex size-6">
                    <InstagramIcon />
                  </div>
                </a>
              </div>
              <div >
                <a href={siteConfig.links.linkdin}>
                  <div className="flex size-8">
                    <LinkedinIcon />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Divider className='w-full bg-gray-300' />
        <p className="mt-4 pb-10 text-sm text-balck">
          &copy; Copyright 2023. All Rights Reserved by Prospera Hospitality Pvt. Ltd.
        </p>
      </div>
    </footer>
  )
};