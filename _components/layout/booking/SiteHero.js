import { Star } from "lucide-react";
import { Button } from '@nextui-org/react';
import HeroCarousel from '@/_components/layout/booking/heroimagcarousel/heroimgcarousel'
import VerticalHeroCarousel from '@/_components/layout/booking/heroimagcarousel/verticalheroimgcarousel'
import HeroTextCarousel from '@/_components/layout/booking/heroimagcarousel/herotextcarousel'
import Bookingselctor from "@/_components/ui/BookingSelctor"


export default function Hero() {

    return (
        <div className='pt-[50px] h-screen w-screen bg-white/40'>
            <div className="w-[96%] h-[85%] m-auto">
                <div className='absolute z-0 m-auto w-[96%] h-[85%] rounded-lg'>
                    <div className='w-full h-full'>
                        <HeroCarousel />
                    </div>
                </div>
                <div className='z-50 absolute m-auto w-[96%] h-[85%] rounded-lg'>
                    <div className='w-full h-full'>
                        <div className="h-[30%] pt-8 pl-20">
                            <div>
                                <h1 className='text-6xl text-white font-semibold w-fit'>Relax, dream, love,</h1>
                                <div className='flex flex-row'>
                                    <h1 className='text-6xl text-white font-semibold w-fit'>sleep, in... </h1>
                                    <div className='overflow-hidden w-1/2 z-10 h-20 rounded-lg'>
                                        <HeroTextCarousel />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[88%] h-[40%] mx-auto">
                            <p className='text-white mt-4'>Find and book your destination</p>
                            <div className='flex justify-between mt-5'>
                                <Button color="primary" size="md" radius='lg' variant='shadow'>Discover more</Button>
                                <div className=''>
                                    <div className="flex">
                                        <Button isIconOnly color="primary" size="sm" radius='sm' variant='shadow'>
                                            <Star className='size-5' />
                                        </Button>
                                        <p className='text-white font-semibold ml-2'>Next Destination</p>
                                    </div>
                                    <div className='overflow-hidden z-10 w-72 h-44 rounded-lg'>
                                        <VerticalHeroCarousel />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="z-10 w-[80%] ml-[10%] -mt-24 mx-auto">
                        <Bookingselctor />
                    </div>
                </div>
            </div>
        </div>
    )
};
