import React from 'react'

const RIMainContTopBar = () => {
    return (
        <div className='rounded-xl w-screen p-2'>
            <div className='grid grid-cols-12 border-b border-foreground-300'>
                <div className='col-span-1 h-12 text-center border-r border-foreground-300'>
                    <div className='text-base text-foreground-800 font-semibold'>
                        Booking Date
                    </div>
                </div>
                <div className='col-span-3 text-center'>
                    <div className='text-base text-foreground-800 font-semibold'>
                        Rate (GST Exlusive)
                    </div>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-3 text-center text-foreground-500 font-semibold'>3 Hrs</div>
                        <div className='col-span-3 text-center text-foreground-500 font-semibold'>6 Hrs</div>
                        <div className='col-span-3 text-center text-foreground-500 font-semibold'>12 Hrs</div>
                        <div className='col-span-3 text-center text-foreground-500 font-semibold'>24 Hrs</div>
                    </div>
                </div>
                <div className='col-span-2 text-center border-x border-foreground-300'>
                    <div className='text-base text-foreground-800 font-semibold'>
                        Rooms
                    </div>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-6 text-center text-foreground-500 font-semibold'>Rooms</div>
                        <div className='col-span-6 text-center text-foreground-500 font-semibold'>Booked</div>
                    </div>
                </div>
                <div className='col-span-6 text-center'>
                    <div className='text-base text-foreground-800 font-semibold'>
                        Manage Timing (First Check in - Last Check Out)
                    </div>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-2 text-center text-foreground-500 font-semibold'>3 hrs</div>
                        <div className='col-span-2 text-center text-foreground-500 font-semibold'>6 hrs</div>
                        <div className='col-span-2 text-center text-foreground-500 font-semibold'>13 hrs</div>
                        <div className='col-span-2 text-center text-foreground-500 font-semibold'>24 hrs</div>
                        <div className='col-span-4 text-center text-foreground-500 font-semibold' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RIMainContTopBar