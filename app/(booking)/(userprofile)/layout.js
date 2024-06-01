import UserProfileSideBar from '@/app/(booking)/(userprofile)/UserProfileSideBar'

export default function UserProfilLayout({children}) {
  return (
    <>
    <div className='w-screen h-screen flex'>
      <div className='w-[10%] h-full bg-white/40'>
        <UserProfileSideBar />
      </div>
      <div className='w-[90%] h-full bg-white/40'>
        {children}
      </div>
    </div>
    </>
  )
}
