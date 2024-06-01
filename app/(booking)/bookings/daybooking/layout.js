// import SiteFooter from '@/app/_components/layout/site-footer'
// import BookingSideBar from "@/app/_components/layout/booking/bookingside-bar";
import DayBookingTopBar from '@/app/_components/layout/booking/daybookings/daybookingtop-bar';

export default function DayBookingLayout({children}) {
  return (
    <>
    {/* <DayBookingTopBar /> */}
    {/* <SiteHeader /> */}
    {/* <BookingSideBar /> */}
        {children}
    {/* <SiteFooter /> */}
    </>
  )
}
