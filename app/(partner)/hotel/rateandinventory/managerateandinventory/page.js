import React from 'react'
import RITopBar from '@/app/(partner)/hotel/rateandinventory/managerateandinventory/RITopBar'
import RIMainCont from '@/app/(partner)/hotel/rateandinventory/managerateandinventory/RIMainCont'

const ManageRateAndInventorPage = () => {
  return (
    <div className='h-full w-full p-2 pt-6 space-y-2'>
            <div className='w-full h-[15%]'>
            <RITopBar />
            {/* <h1 className='text-3xl text-red-500 text-center'>* Use react hook form</h1> */}
            </div>
            <div className='w-full h-[85%] bg-foreground-50 rounded-xl shadow-xl overflow-y-scroll'>
            <RIMainCont />
            </div>
    </div>
  )
}

export default ManageRateAndInventorPage