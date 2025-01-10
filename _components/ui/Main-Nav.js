import Image from 'next/image'
import { IMAGES } from '@/public/index'
import Link from 'next/link'

export default function MainNav () {
  return (
  <div className='px-4 flex mr-4 ml-3'>
    <Link href="/" className='mr-6 flex items-center space-x-2'>
    <Image src={IMAGES.Fulllogo} alt="Logo" width={200} height={200} />
    </Link>
    
  </div>
  )
}