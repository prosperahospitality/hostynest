'use client'
import Hero from "@/app/_components/layout/booking/SiteHero";
import SiteDiscover from "@/app/_components/layout/booking/SiteDiscover";
import SiteUnbeatable from "@/app/_components/layout/booking/SiteUnbeatable";
import SiteBudgetStays from "@/app/_components/layout/booking/SiteBudgetStays";
import SiteAcrossIndia from "@/app/_components/layout/booking/SiteAcrossIndia";
import Explorebycities from "@/app/_components/layout/booking/SiteExploreByCities"
import SessionClient from "@/app/nextauth/SessionClient"
import { SessionProvider } from "next-auth/react"

export default function Home() {

  return (
    <>
      <SessionProvider>
        <Hero />
        <SiteDiscover />
        <SiteUnbeatable />
        <SiteBudgetStays />
        <SiteAcrossIndia />

        {/* <SessionClient /> */}

        {/* <Explorebycities /> */}


      </SessionProvider>
      

    </>

  )

}