'use client'
import React from 'react'
import Image from 'next/image'
import { IMAGES } from '@/public/index'
// import {Card, CardFooter, Image, Button} from "@nextui-org/react";
import AcrossIndiaImgCarousel from '@/_components/ui/acrossindiaimgcarousel/AcrossIndiaImgCarousel'
import '@/_components/ui/styles/acrossindiaimagcarousel.css'
import { Button } from '@nextui-org/react'

const OPTIONS = { dragFree: true, loop: true }
// const SLIDE_COUNT = 6
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
const SLIDES = [
    {
        title: 'The Secred Ramzan',
        discription: "Experience the spiritual vibrancy of Ramadan at Jama Masjid, Delhi's iconic landmark, where the timeless rituals of devotion and community come alive amidst the historic architecture, offering a profound glimpse into India's rich cultural tapestry.",
        btnlink: 'onclick link pase here....',
        img: 'Ramzan',
    },
    {
        title: 'Guru Nanak Jayanti',
        discription: "Guru Nanak Jayanti celebrates the birth of Sikhism's founder, Guru Nanak Dev Ji, with colorful processions and devotional singing. Visit the Golden Temple during this time to witness the divine aura and immerse yourself in the vibrant festivities of Sikh culture.",
        btnlink: 'onclick link pase here....',
        img: 'Goldentemple',
    },
    {
        title: 'Ganesh Chaturthi',
        discription: "The Ganesh festival in Mumbai, particularly at Lalbaugcha Raja, is a spectacle of devotion and grandeur, attracting millions of devotees each year. The majestic idol of Lord Ganesha at Lalbaugcha Raja is renowned for fulfilling wishes, making it a must-visit for seekers of blessings and spiritual fulfillment.",
        btnlink: 'onclick link pase here....',
        img: 'Lalbaughraja',
    },
    {
        title: 'Ganga Dusshera',
        discription: "The Ganga, revered as India's holiest river, attracts pilgrims seeking spiritual purification through ritualistic dips and witnessing the mesmerizing Ganga Aarti in Varanasi. Its banks are adorned with ancient temples, bustling ghats, and vibrant markets, offering diverse experiences from tranquil Himalayan foothills to bustling city ghats.",
        btnlink: 'onclick link pase here....',
        img: 'GangaArti',
    },
    {
        title: 'Lumbini Festival',
        discription: "he Lumbini Festival, celebrated in Lumbini, Nepal, honors the birthplace of Lord Buddha. It showcases Buddhist traditions, cultural performances, and spiritual rituals. Pilgrims and tourists gather to pay homage to the sacred site, immerse themselves in meditation, and explore Buddhist teachings. The festival promotes peace, harmony, and spiritual enlightenment.",
        btnlink: 'onclick link pase here....',
        img: 'Bodhgaya',
    },
    {
        title: 'Christmas in goa',
        discription: "Experience Christmas in Goa, a vibrant celebration blending Portuguese and Indian traditions. Enjoy midnight masses at historic churches, feast on traditional Goan delicacies, and join beach parties with live music and fireworks. With stunning beaches, lush landscapes, and vibrant culture, Goa offers a festive experience like no other.",
        btnlink: 'onclick link pase here....',
        img: 'Churchgoa',
    },
]



const SiteAcrossIndia = () => {
    return (
        <div className='h-fit w-screen bg-white'>
            <div className='h-[20%] flex items-center pl-8'>

                <h1 className='text-[100px] font-bold italic bg-gradient-to-r from-blue-300  to-purple-300 inline-block text-transparent bg-clip-text text-opacity-50'>ACROSS INDIA</h1>

                <div className='flex gap-4 mt-3 bg-white bg-opacity-80 absolute'>
                    <div className='bg-primary w-1 h-[24px] rounded-lg'></div>
                    <h4 className='text-primary text-base italic font-bold'>Best Cultural Experience</h4>
                </div>
            </div>
            <div className='h-[80%] w-[95%] space-y-4 mx-auto'>
                <div className='h-[70%]'>
                <AcrossIndiaImgCarousel slides={SLIDES} options={OPTIONS} />
                </div>
                
            </div>
        </div>
    )
}

export default SiteAcrossIndia;