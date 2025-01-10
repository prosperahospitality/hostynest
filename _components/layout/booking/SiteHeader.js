'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import {IMAGES} from '@/public/index'
import { ThemeSwitch } from "@/_components/ui/ThemeSwitch";
import { button as buttonStyles } from "@nextui-org/theme";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Popover, PopoverTrigger, PopoverContent, Tooltip, Badge } from "@nextui-org/react";
import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale, DiscordIcon, TwitterIcon, GithubIcon, MoonFilledIcon, SunFilledIcon, HeartFilledIcon, SearchIcon, FullLogo, NotificationIcon } from "@/_components/icon";
import siteConfig from "@/config/site";
import { User } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation'
import { useSession, getSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { KeyRound, Settings, Power, Mail, MessageCircleMore, MessageCircleQuestion } from 'lucide-react'
import { RxExternalLink } from "react-icons/rx";
import { useSelector } from "react-redux";
import { set } from 'date-fns';

export default function SiteHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [isInvisible, setIsInvisible] = React.useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const [sessionValue, setSessionValue] = useState({});

  let currentPageUrl;
  if(typeof window !== 'undefined')
  {
    currentPageUrl = window.location.href;
  }
  
  let dat = useSelector((state) => state.log.loginState);

    useEffect(() => {
    
      const getSessionInfo = async () => {
        const session = await getSession();
        setSessionValue(session);
      };
      getSessionInfo();
    }, [])

    useEffect(() => {

      if(dat === 1 && !currentPageUrl.includes("/login")) {
        window.location.reload()
      }

    }, [dat, currentPageUrl])

    useEffect(() => {
    
      console.log("Session at top bar home: ",sessionValue);
      if(sessionValue && sessionValue?.user?.user_role === "admin" || sessionValue?.user?.user_role === "partner") {
        setSessionValue(null)
      }

    }, [sessionValue])

  const menuItems = [
    "Home",
    "List Hotel",
    "How it Works ?",
    "Contact Us",
    "FAQ's",
    "About",
    "Login/Sign Up",
  ];

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  const notification = (
    <PopoverContent>
      <div className="px-1 py-2">
        <div className="text-small font-bold">Popover Content</div>
        <div className="text-tiny">This is the popover content</div>
      </div>
    </PopoverContent>
  );

  const profile = (
    <PopoverContent>
      <div>
      <div className="px-1 py-2 flex gap-10">
        {sessionValue && sessionValue?.user?.user_role === "guest" 
          ? <User   
              name={sessionValue?.user?.firstname + ' ' + sessionValue?.user?.lastname}
              description="Agent 007"
              avatarProps={{
                src: "https://www.svgrepo.com/show/509009/avatar-thinking-3.svg"
              }}
              className='text-black'
            />
          : ""
        }
      
        <Link
                            href='/hotel/dashboard'
                            className={`${buttonStyles({ color: "default", size: "sm", radius: "full", variant: "light" })} text-primary`}
                        >
                          <Tooltip content="Change Password" color='danger'>
                          <KeyRound  className='mt-2'/>
                          </Tooltip>
        </Link>
      </div>
      <Link
                            href='/userprofile'
                            className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} text-primary ml-3`}
                        >
                            <Settings />Settings
        </Link>
      </div>

          <label className="mr-28 mt-2 text-xs font-semibold uppercase text-primary">Need Help ?</label>
      <div className="flex flex-col items-start mr-6">

          <Link
                            href='#'
                            className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} text-primary`}
                        >
                            <Mail />Report an Issue
        </Link>

        <Link
                            href='#'
                            className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} text-primary`}
                        >
                            <MessageCircleMore />Chat Support<RxExternalLink className='ml-6' size={16}/>
        </Link>

        <Link
                            href='#'
                            className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} text-primary`}
                        >
                            <MessageCircleQuestion />Explore FAQs<RxExternalLink className='ml-6' size={16}/>
        </Link>

        <Button variant='shadow' color="danger" size='sm' className='left-16 mt-3' startContent={<Power />} onClick={(e) => signOut()} >Logout</Button>
        </div>
    </PopoverContent>
  );



  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="absolute h-12 w-screen z-50 bg-white" shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <Image src={IMAGES.Fulllogo}
            alt="Logo"
            width={200}
            height={200} /> */}
            <FullLogo height={40} width={200}/>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <ul className="flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={`link ${pathname === item.href ? 'text-primary font-bold' : 'text-black font-extralight'}`}
                href={item.href}
              >
                {item.label}  
              </Link>
            </NavbarItem>
          ))}
        </ul>
        <Dropdown className='bg-white'>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                endContent={icons.chevron}
                radius="sm"
                variant="light"
                color='primary'
                className='text-black'
              >
                Help & Support
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            color='primary'
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="ACME scales apps to meet user demand, automagically, based on load."
              startContent={icons.scale}
              href='/helpsupport/howitworks'
            >
              How it Works ?
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              startContent={icons.activity}
              href='/helpsupport/contactus'
              >
              Contact Us
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="ACME runs on ACME, join us and others serving requests at web scale."
              startContent={icons.user}
              href='/helpsupport/faqs'
            >
              FAQ&apos;s
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>


       
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex">

          {/* <ThemeSwitch /> */}


          <div className="ml-6 flex justify-between items-center">

            {sessionValue && sessionValue?.user?.user_role === "guest"
              ? sessionValue?.user?.firstname === undefined && sessionValue?.user?.lastname === undefined 
                ? <Link
                    href="/login"
                    // onClick = {(e) => signIn()}
                    className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
                  >
                    Login/Sign Up
                  </Link> 
                : <>
                   
                    {/* notification area */}
                      <Popover key="bottom" placement="bottom" color="default" backdrop='transparent'>
                      <PopoverTrigger>
                      <Button color="primary" variant="link" className="capitalize">
                      <Badge color="danger" content="9" isInvisible={isInvisible} shape="circle" showOutline={false} className='mt-1'>
                      <NotificationIcon className="text-primary mt-1" size={24} />
                      </Badge>
                      </Button>
                      </PopoverTrigger>
                      {notification}
                    </Popover>
                    
                    {/* Profile area */}
                    <Popover key="bottom" placement="bottom" color="default" backdrop='transparent'>
                      <PopoverTrigger>
                      <Button color="primary" variant="link" className="capitalize">
                    <User   
                      name={sessionValue?.user?.firstname + ' ' + sessionValue?.user?.lastname}
                      description="Agent 007"
                      avatarProps={{
                        src: "https://www.svgrepo.com/show/509003/avatar-thinking-6.svg"
                      }}
                      className='text-black'
                    />
                    </Button>
                      </PopoverTrigger>
                        {profile}
                    </Popover>
                  </>
              : <><Link
                    href="/login"
                    // onClick = {(e) => signIn()}
                    className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
                  >
                  Login/Sign Up
                </Link>
                </>
            }
          </div>

        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

    </Navbar>
  );
}