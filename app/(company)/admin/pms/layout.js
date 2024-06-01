import PmsSideBar from '@/app/(company)/admin/pms/PmsSideBar'
import PmsTopBar from '@/app/(company)/admin/pms/PmsTopBar'


export default function pmsPageLayout({ children }) {
  return (
    <>
      <div className='flex flex-row'>
        <PmsSideBar />
        <div className="relative w-screen h-screen top-0 left-0" >
        <PmsTopBar />
        <div className="flex flex-row h-screen overflow-y-scroll" >
          {children}
        </div>
        </div>
      </div>
    </>
  )
}
