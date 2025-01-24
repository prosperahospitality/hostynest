import React from 'react'
import RITopBar from './RITopBar'
import RIMainCont from './RIMainCont'

const ManageRateAndInventorPage = () => {
  return (
    <div className='h-full w-full p-2 pt-6 space-y-2'>
            <div className='w-full h-[15%]'>
            <RITopBar />
            </div>
            <div className='w-full h-[85%] bg-foreground-50 rounded-xl shadow-xl overflow-y-scroll'>
            <RIMainCont />
            </div>
    </div>
  )
}

export default ManageRateAndInventorPage