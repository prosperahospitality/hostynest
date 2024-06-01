import SettingsSideBar from '@/app/(booking)/(userprofile)/settings/SettingsSideBar'

export default function UserProfilLayout({ children }) {
  return (
    <>
      <div className=' w-full h-full flex items-center justify-between bg-white/40'>
        <div className='w-full h-[95%] pt-9 p-2 flex gap-6'>
          <div className='bg-white rounded-xl shadow-xl p-4 w-[25%] space-y-4'>
            <SettingsSideBar />
          </div>
          <div className='w-[75%] h-full bg-white shadow-xl rounded-xl p-4 overflow-y-scroll'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
