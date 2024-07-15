'use client'
import React from 'react'
import { Card, CardHeader, CardBody, Image, Button, Chip } from "@nextui-org/react";


const CoreDatas = [
  {
    title: 'Empowering Guests with Flexible Check in Options',
    description: "Our dedication to providing the utmost flexibility in hourly check-ins, even as early as 6 am, reflects our commitment to offering travelers the freedom to choose. Whether it's allowing couples to enjoy personal time or accommodating early arrivals, we aim to set a new standard of flexibility with HostyNest.",
  },
  {
    title: 'Brief, Refreshing Stays',
    description: "With durations as brief as 3, 6, and 12 hours, we ensure guests only pay for the time they need, enabling them to enjoy a quick and rejuvenating break without unnecessary expenses.",
  },
  {
    title: 'Luxurious Accommodations',
    description: 'At HostyNest, we prioritize quality over quantity. Each hotel undergoes rigorous verification before enlistment, ensuring guests experience the finest stay every time.',
  },
  {
    title: 'Premium Hotels at Hourly Rates',
    description: "Our exclusive, budget-friendly hourly hotel-booking packages provide the perfect opportunity to relax and recharge, away from the city's hustle and bustle, without exceeding your budget.",
  },
]


const ServiceWork = () => {
  return (
    <div className='gap-2'>
      <p>We simplify the process of comparing bookings from various hotels, property owners, and service providers.</p>
      <p>When you book through our platform, you&apos;re entering into a contract directly with the service provider, unless stated otherwise.</p>
      <p>The information on our platform comes from the service providers themselves. While we strive to keep everything current, updates such as text descriptions and lists of facilities provided by accommodations may take a few hours to reflect</p>
    </div>
  )
};

const WorkWith = () => {
  return (
    <div className='gap-2'>
      <p>Only Service Providers that have a contractual relationship with us will be displayed on our Platform. They may offer Travel Experiences outside our Platform as well.</p>
      <p>We don’t own any Accommodations ourselves—each Service Provider is a separate company that has agreed to work with us in a certain way.</p>
      <p>Our Platform tells you how many Accommodations you can book through us worldwide – and our search results page tells you how many of them might be right for you, based on what you’ve told us.</p>
    </div>
  )
};

const MakeMoney = () => {
  return (
    <div className='gap-2'>
      <p>We do not purchase or resell any products or services. Instead, after your stay is completed, the service provider pays us a commission. When the second accommodation in your search results is labeled &quot;Ad,&quot; it indicates that the service provider has paid for its placement as part of our &quot;Booking Network Sponsored Ads&quot; program.</p>
    </div>
  )
};

const RecommendationSystems = () => {
  return (
    <div className='gap-2'>
      <p>All great properties deserve to be discovered. That’s why we use “recommendation” systems to display information on our Platform in a way that’ll help you discover properties we think you’ll like. For example, on the “Stays” landing page, you’ll find a number of recommendation systems, including:</p>
      <p className='flex'><span className='font-semibold text-gray-500 flex gap-1'><SealCheck height={15} width={15} className='mt-1' /> Popular Destinations:</span> Explore trending destinations based on bookings made by travelers with similar preferences to yours.</p>
      <p className='flex'><span className='font-semibold text-gray-500 flex gap-1'><SealCheck height={15} width={15} className='mt-1' /> Homes guests love:</span> Home properties with high review scores.</p>
      <p className='flex'><span className='font-semibold text-gray-500 flex gap-1'><SealCheck height={15} width={15} className='mt-1' /> Looking for the perfect stay?</span> Properties (as opposed to destinations) that you may want to stay at, based on Bookings made by other guests whose searches were similar to yours.</p>
      <p>Our search results serve as a primary recommendation system, widely utilized by our customers. Explore our &quot;Default Ranking and Sorting Options&quot; to experience its effectiveness firsthand.</p>
      <p className='pt-4'>All the recommendation systems we use provide recommendations based on one or more of the following factors:</p>
      <p className='pl-2 flex gap-1 pt-2'><SealCheck height={15} width={15} className='mt-1' /> What you tell us in the search form: destination, dates, number of guests, etc.</p>
      <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' /> We leverage data from your interactions with our platform, including past searches and your current browsing location, to enhance your user experience and provide tailored recommendations.</p>
      <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' /> An Accommodation’s performance on our Platform:</p>
      <div className='pt-1 pb-1 pl-4'>
        <p className='pl-2'>1. Its <b>click through rate</b> (how many people click on it)</p>
        <p className='pl-2'>2. its <b>gross bookings</b> (how many bookings are made with that Accommodation)</p>
        <p className='pl-2'>3. its <b>net bookings</b> (how many bookings are made with that Accommodation, minus how many are canceled)</p>
      </div>
      <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' /> Information about an Accommodation’s availability, pricing scores, review scores, etc.</p>
      <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' /> To simplify the process of finding and booking accommodations, we adjust the importance of each factor based on what is likely to generate a list of properties that align with your prefrences.</p>
      <h4 className='text-xl pt-4'>Our default ranking and sorting options</h4>
      <div className='p-3'>
        <p>Our search results are also a recommendation system. They show all the Accommodations (hotels, apartments, etc.) that match your search. To see all the booking options an Accommodation offers, just click it.</p>
        <p className='pt-2'>When you first get your search results, they’ll be sorted (“ordered”) by “Our top picks” (called “Popularity” on our app):</p>
        <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' />To appear high up on the page, an Accommodation needs to do well in each of these three areas:</p>
        <div className='pt-1 pb-1 pl-4'>
          <p className='pl-2'>1. Its <b>click through rate</b> (how many people click on it)</p>
          <p className='pl-2'>2. its <b>gross bookings</b> (how many bookings are made with that Accommodation)</p>
          <p className='pl-2'>3. its <b>net bookings</b> (how many bookings are made with that Accommodation, minus how many are canceled)</p>
        </div>
        <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' />Indeed, those numbers are influenced by various factors such as review scores, availability, policies, pricing, quality of content like photos, and additional features.</p>
        <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' />An Accommodation’s ranking can also be influenced by other things—for example, how much commission they pay us on Bookings, how quickly they usually pay it, whether they’re part of our Genius program or Preferred Partner(+) Program and in certain places*, whether we organize their payments.</p>
        <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' />Any information we’ve gathered based on how you interact with our Platform (including what you tell us) will also be a factor.</p>
        <p>Many of the above factors help our recommendation system decide which Accommodations might be the most appealing and relevant to you. Some play a small role in that decision, while others play a big role—and the importance of each factor can change, depending on the features of the Accommodation and on how you and other people use our Platform.</p>
        <p>For example, an Accommodation’s click-through rate and number of Bookings often play a large role in the decisions. That’s because they’re a direct reflection of the Accommodation’s overall appeal and how satisfied its guests tend to be with what it offers.</p>
        <p>A high click-through rate usually means that the Accommodation makes a good first impression on our Platform (e.g. through images, amenities, or descriptions)—and getting a lot of Bookings indicates that many people find it really does meet their requirements.</p>
        <p className='pt-4'>If you would prefer us not to order your search results in our default way, you can sort them in other ways, such as:</p>
        <div className='pt-4'>
          <p><span className='text-primary-400 font-semibold'>Price (lowest first).</span> Accommodations with lower prices appear higher up.</p>
          <p><span className='text-primary-400 font-semibold'>Property rating (high to low).</span>  Accommodations with more stars* and/or higher quality ratings* appear higher up.</p>
          <p><span className='text-primary-400 font-semibold'>Property rating (low to high).</span> Accommodations with fewer stars and/or lower quality ratings appear higher up.</p>
          <p><span className='text-primary-400 font-semibold'>Distance from (X).</span> Accommodations that are closer to X (e.g., the city center) appear higher up the page. (When we say “close,” we mean “close in a straight line.”)</p>
          <p><span className='text-primary-400 font-semibold'>Property rating.</span> Accommodations with more stars appear higher up. Within each segment (5 stars, 4 stars, etc.) the ones with lower prices appear higher up.</p>
          <p><span className='text-primary-400 font-semibold'>Best reviewed and lowest price.</span> Accommodations with higher review scores appear higher up. Within each 0.5 segment (between 10 and 9.5, between 9.5 and 9, etc.) the ones with lower prices appear higher up.</p>
        </div>
      </div>
    </div>
  )
};

const Reviews = () => {
  return (
    <div className='gap-2'>
      <p>To make sure reviews are relevant, we may only accept reviews that are submitted within 3 months of checking out, and we may stop showing reviews once they’re 36 months old – or if the Accommodation has a change of ownership.</p>
      <p>Reviews may contain translations powered by Google, not HostyNest. Google disclaims all warranties related to the translations, express or implied, including any warranties of accuracy, reliability, and any implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
    </div>
  )
};

const Prices = () => {
  return (
    <div className='gap-2'>
      <p>The rates displayed on our Platform are set by the Service Providers. We may finance rewards or other benefits out of our own pocket. When you make a Booking, you agree to pay the cost of the Travel Experience itself and any other charges and taxes that may apply (e.g. for any extras). Taxes and fees may vary for different reasons, such as the Service Provider’s location, the kind of room selected, and the number of guests. The price description tells you whether any taxes and fees are included or excluded. You’ll be able to find more information about the price while you’re booking. Our Platform provides descriptions of any equipment and facilities that Service Providers offer (based on what they tell us). It also tells you how much extra they’ll cost, if anything.</p>
    </div>
  )
};


const Payments = () => {
  return (
    <div className='gap-2'>
      <p>There are Two ways you might pay for your Booking:</p>
      <div className='p-4'>
        <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' />The Service Provider charges you at the Accommodation.</p>
        <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' />We organize your payment to the Service Provider in advance. We will take your Payment Method details and make sure the Service Provider is paid.</p>
      </div>
    </div>
  )
};

const UnexpectedHappens = () => {
  return (
    <div className='gap-2'>
      <p>If you have any questions, or if something doesn’t go according to plan, just contact us. You can do this by accessing your Booking either through our app, or through our Help Center, where you’ll also find some useful FAQs). We handle complaints as soon as possible, treating the most urgent ones as the highest priority</p>
      <p>You can help us help you as quickly as possible by providing</p>
      <div className='p-4'>
        <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' />your Booking confirmation number, your Booking.com PIN code, your contact details, and the email address you used when you booked your stay</p>
        <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' />A summary of the situation you need assistance with, including how you’d like us to help you</p>
        <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' />Any supporting documents (bank statement, photos, receipts, etc.).</p>
      </div>
    </div>
  )
};


const Overbooking = () => {
  return (
    <div className='gap-2'>
      <p>Once your Booking is confirmed, your Service Provider is required to honor it. If the Service Provider is “overbooked,” they’re responsible for finding a solution as soon as possible – but we provide them with guidelines, as well as practical help.</p>
      <p>If they can’t give you the option you booked and they can’t offer you a suitable alternative:</p>
      <div className='p-4'>
        <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' />If your Service Provider had organized your payment, we’ll try to ensure they refund you as soon as possible.</p>
        <p className='pl-2 flex gap-1'><SealCheck height={15} width={15} className='mt-1' />If we organized your payment, we’ll refund you ourselves. In 90% of cases, the money should be in your account within 5 business days of the time when:</p>
        <div className='pt-1 pb-1 pl-4'>
          <p className='pl-2'>1. your original Booking is canceled, or</p>
          <p className='pl-2'>2. we verify the invoice you send us (to show that you stayed somewhere else).</p>
        </div>
      </div>
    </div>
  )
};

const FunctioningDatas = [
  {

    id: '1',
    title: "Wh😶 We Are",
    description: "When you book accommodation, HostyNest oversees the platform but not the travel experience itself. HostyNest is a Indian Company based in NaviMumbai.",
  },
  {
    id: '2',
    title: "How does our service work?",
    description: <ServiceWork />,
  },
  {
    id: '3',
    title: "Who do we work with?",
    description: <WorkWith />,
  },
  {
    id: '4',
    title: "How do we make money?💵",
    description: <MakeMoney />,
  },
  {
    id: '5',
    title: "Our recommendation systems",
    description: <RecommendationSystems />,
  },
  {
    id: '6',
    title: "Reviews",
    description: <Reviews />,
  },
  {
    id: '7',
    title: "Prices💸",
    description: <Prices />,
  },
  {
    id: '8',
    title: "Payments💳",
    description: <Payments />,
  },
  {
    id: '9',
    title: "Help and advice – if the unexpected happens",
    description: <UnexpectedHappens />,
  },
  {
    id: '10',
    title: "Overbooking",
    description: <Overbooking />,
  },
]


const Section2 = () => {
  return (
    <div className='w-screen h-fit bg-white'>
      <div className='p-8'>
        <h3 className='text-3xl text-primary-500 font-semibold text-center'>Book a room in 3 easy steps ....</h3>
        <div className='w-full h-fit mt-4'>
          <div className='w-[80%] mx-auto'>
            <div className='flex justify-between w-[80%] mx-auto'>
              <Card className="p-4 pb-10 text-center bg-white">
                <CardHeader className="pb-0 pt-2 px-4 flex-col">
                  <Button color='primary' variant='shadow' radius='full' size='lg' isIconOnly >1</Button>
                  <h4 className="text-2xl text-primary pt-3">City or Property</h4>
                </CardHeader>
                <CardBody className="overflow-visible text-center">
                  <h6 className='text-sm text-gray-400 w-52 mx-auto'>Select a City and choose a hotel of your choice from the list</h6>
                </CardBody>
              </Card>
              <Card className="p-4 pb-10 text-center bg-white">
                <CardHeader className="pb-0 pt-2 px-4 flex-col">
                  <Button color='primary' variant='shadow' radius='full' size='lg' isIconOnly >2</Button>
                  <h4 className="text-2xl text-primary pt-3">Hours & Date</h4>
                </CardHeader>
                <CardBody className="overflow-visible text-center">
                  <h6 className='text-sm text-gray-400 w-52 mx-auto'>Select a specific Date of your stay then select the number of hours of your stay</h6>
                </CardBody>
              </Card>
              <Card className="p-4 pb-10 text-center bg-white">
                <CardHeader className="pb-0 pt-2 px-4 flex-col">
                  <Button color='primary' variant='shadow' radius='full' size='lg' isIconOnly >3</Button>
                  <h4 className="text-2xl text-primary pt-3">Check In time</h4>
                </CardHeader>
                <CardBody className="overflow-visible text-center">
                  <h6 className='text-sm text-gray-400 w-52 mx-auto'>Choose Your own Check in timings, and your booking is complete</h6>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        <div className='pt-10'>
          <h3 className='text-lg text-gray-500 font-semibold'>The Core Belief of HostyNest</h3>
          <div className='flex flex-col gap-4 pt-4'>
            {CoreDatas.map((CoreData, index) =>
              <div key={index}>
                <Chip color='primary' variant='light' startContent={<SealCheck height={25} width={25} />}>{CoreData.title}</Chip>
                <p className='text-sm text-gray-400 pl-8'>{CoreData.description}</p>
              </div>
            )}
          </div>
          <div>
            <h3 className='pt-8 text-2xl text-gray-500 font-semibold'>Our Function</h3>
            <div className='pt-6 flex flex-col gap-4'>
              {FunctioningDatas.map((FunctioningData) =>
                <a href={`#${FunctioningData.id}`} key={FunctioningData.id}>
                  <Chip color='primary' variant='light' startContent={<SealCheck height={30} width={30} />}>
                    <h3 className='text-xl'>{FunctioningData.title}</h3>
                  </Chip>
                </a>
              )}
            </div>
            <div className='p-10 flex flex-col space-y-4'>
              {FunctioningDatas.map((FunctioningData) =>
                <div id={FunctioningData.id} key={FunctioningData.id}>
                  <h1 className='text-2xl text-gray-600'>{FunctioningData.id}. {FunctioningData.title}</h1>
                  <p className='text-sm text-gray-400 ml-6'>{FunctioningData.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section2;


const SealCheck = ({
  size, height, width, ...props
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill="#007ebb"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M232,128c0,12.51-17.82,21.95-22.68,33.69-4.68,11.32,1.42,30.65-7.78,39.85s-28.53,3.1-39.85,7.78C150,214.18,140.5,232,128,232s-22-17.82-33.69-22.68c-11.32-4.68-30.65,1.42-39.85-7.78s-3.1-28.53-7.78-39.85C41.82,150,24,140.5,24,128s17.82-22,22.68-33.69C51.36,83,45.26,63.66,54.46,54.46S83,51.36,94.31,46.68C106.05,41.82,115.5,24,128,24S150,41.82,161.69,46.68c11.32,4.68,30.65-1.42,39.85,7.78s3.1,28.53,7.78,39.85C214.18,106.05,232,115.5,232,128Z" opacity="0.2"></path><path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z">
      </path>
    </svg>
  );
};