'use client'
import React from 'react'
import Link from 'next/link'
import { button as buttonStyles } from "@nextui-org/theme";
import { LayoutDashboard, Building2, CalendarCheck, User, LogIn } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/react';

const UserProfileSideBar = () => {

  const pathname = usePathname()

  return (
    <div className='w-full h-full flex items-center justify-between'>
    <div className='bg-primary-400 h-96 w-12 ml-1 rounded-lg shadow-xl flex items-center justify-between'>
      <div className='h-[90%] w-full mx-auto ml-2 bg-primary-100 pt-4 shadow-xl rounded-lg grid'>
        <Link
          href='/userprofile'

        >
            {pathname === '/userprofile' ?
              <>
                <Button variant='shadow' color='primary' size='md' radius='sm'>
                  <UserCircle size={40} />Profile
                </Button>
              </>
              :
              <Button variant='shadow' color='primary' size='md' radius='sm' isIconOnly>
                <UserCircle size={25} />
              </Button>
            }
        </Link>

        

        <Link
          href='/wallet'
        >
          {pathname === '/wallet' ?
              <>
                <Button variant='shadow' color='primary' size='md' radius='sm'>
                  <Wallet size={40} />Wallet
                </Button>
              </>
              :
              <Button variant='shadow' color='primary' size='md' radius='sm' isIconOnly>
                <Wallet size={25} />
              </Button>
            }
        </Link>

        <Link
          href='/bookings'
        >
          {pathname === '/bookings' ?
              <>
                <Button variant='shadow' color='primary' size='md' radius='sm'>
                  <SuitcaseSimple size={40} />Bookings
                </Button>
              </>
              :
              <Button variant='shadow' color='primary' size='md' radius='sm' isIconOnly>
                <SuitcaseSimple size={25} />
              </Button>
            }
        </Link>

        <Link
          href='/favourites'
        >
          {pathname === '/favourites' ?
              <>
                <Button variant='shadow' color='primary' size='md' radius='sm'>
                  <Heart size={40} />Favourites
                </Button>
              </>
              :
              <Button variant='shadow' color='primary' size='md' radius='sm' isIconOnly>
                <Heart size={25} />
              </Button>
            }
        </Link>

        <Link
          href='/refund'
        >
          {pathname === '/refund' ?
              <>
                <Button variant='shadow' color='primary' size='md' radius='sm'>
                  <CurrencyInr size={40} />Refund
                </Button>
              </>
              :
              <Button variant='shadow' color='primary' size='md' radius='sm' isIconOnly>
                <CurrencyInr size={25} />
              </Button>
            }
        </Link>

        <Link
          href='/settings/prefernce'
        >
          {pathname.startsWith('/settings') ?
              <>
                <Button variant='shadow' color='primary' size='md' radius='sm'>
                  <Gear size={40} />Settings
                </Button>
              </>
              :
              <Button variant='shadow' color='primary' size='md' radius='sm' isIconOnly>
                <Gear size={25} />
              </Button>
            }
        </Link>
        </div>
    </div>
    </div>
  )
}

export default UserProfileSideBar;


export const UserCircle = ({
	size,
	width,
	height,
	...props
}) => (
	<svg
		fill="#fff"
		height={size || height}
		viewBox="0 0 256 256"
		width={size || width}
		{...props}
	>
  <path d="M224,128a95.76,95.76,0,0,1-31.8,71.37A72,72,0,0,0,128,160a40,40,0,1,0-40-40,40,40,0,0,0,40,40,72,72,0,0,0-64.2,39.37h0A96,96,0,1,1,224,128Z" opacity="0.2">
  </path>
  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z">
  </path>
  </svg>
);

export const Wallet = ({
	size,
	width,
	height,
	...props
}) => (
	<svg
		fill="#fff"
		height={size || height}
		viewBox="0 0 256 256"
		width={size || width}
		{...props}
	>
  <path d="M224,88V200a8,8,0,0,1-8,8H56a16,16,0,0,1-16-16V64A16,16,0,0,0,56,80H216A8,8,0,0,1,224,88Z" opacity="0.2">
    </path>
    <path d="M216,72H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,64V192a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Zm0,128H56a8,8,0,0,1-8-8V86.63A23.84,23.84,0,0,0,56,88H216Zm-48-60a12,12,0,1,1,12,12A12,12,0,0,1,168,140Z">
  </path>
  </svg>
);

export const SuitcaseSimple = ({
	size,
	width,
	height,
	...props
}) => (
	<svg
		fill="#fff"
		height={size || height}
		viewBox="0 0 256 256"
		width={size || width}
		{...props}
	>
    <path d="M224,152v48a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V152Z" opacity="0.2">
      </path>
      <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v72H40V72Zm0,128H40V160H216v40Z">
    </path>
    </svg>
);


export const Heart = ({
	size,
	width,
	height,
	...props
}) => (
	<svg
		fill="#fff"
		height={size || height}
		viewBox="0 0 256 256"
		width={size || width}
		{...props}
	>
    <path d="M232,94c0,66-104,122-104,122S24,160,24,94A54,54,0,0,1,78,40c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,94Z" opacity="0.2">
      </path>
      <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z">
      </path>
      </svg>
);


export const CurrencyInr = ({
	size,
	width,
	height,
	...props
}) => (
	<svg
		fill="#fff"
		height={size || height}
		viewBox="0 0 256 256"
		width={size || width}
		{...props}
	>
  <path d="M160,92a52,52,0,0,1-52,52H72V40h36A52,52,0,0,1,160,92Z" opacity="0.2">
    </path>
    <path d="M208,80a8,8,0,0,1-8,8H167.85c.09,1.32.15,2.65.15,4a60.07,60.07,0,0,1-60,60H92.69l72.69,66.08a8,8,0,1,1-10.76,11.84l-88-80A8,8,0,0,1,72,136h36a44.05,44.05,0,0,0,44-44c0-1.35-.07-2.68-.19-4H72a8,8,0,0,1,0-16h75.17A44,44,0,0,0,108,48H72a8,8,0,0,1,0-16H200a8,8,0,0,1,0,16H148.74a60.13,60.13,0,0,1,15.82,24H200A8,8,0,0,1,208,80Z">
    </path>
    </svg>
);


export const Gear = ({
	size,
	width,
	height,
	...props
}) => (
	<svg
		fill="#fff"
		height={size || height}
		viewBox="0 0 256 256"
		width={size || width}
		{...props}
	>
  <path d="M207.86,123.18l16.78-21a99.14,99.14,0,0,0-10.07-24.29l-26.7-3a81,81,0,0,0-6.81-6.81l-3-26.71a99.43,99.43,0,0,0-24.3-10l-21,16.77a81.59,81.59,0,0,0-9.64,0l-21-16.78A99.14,99.14,0,0,0,77.91,41.43l-3,26.7a81,81,0,0,0-6.81,6.81l-26.71,3a99.43,99.43,0,0,0-10,24.3l16.77,21a81.59,81.59,0,0,0,0,9.64l-16.78,21a99.14,99.14,0,0,0,10.07,24.29l26.7,3a81,81,0,0,0,6.81,6.81l3,26.71a99.43,99.43,0,0,0,24.3,10l21-16.77a81.59,81.59,0,0,0,9.64,0l21,16.78a99.14,99.14,0,0,0,24.29-10.07l3-26.7a81,81,0,0,0,6.81-6.81l26.71-3a99.43,99.43,0,0,0,10-24.3l-16.77-21A81.59,81.59,0,0,0,207.86,123.18ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" opacity="0.2">
  </path>
  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8.06,8.06,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8.06,8.06,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z">
  </path>
  </svg>
);

