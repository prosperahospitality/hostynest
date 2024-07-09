'use client'
import { Crown, Dot, Star, MapPin, Heart, Share2, Hotel, CreditCard,CircleParking, Wifi,HandPlatter,Coffee, AirVent,Utensils, Tv, Milk,Dumbbell, ParkingSquare, MessageCircleHeart, Wallet, BatteryCharging, Refrigerator, WashingMachine, Cctv, Check } from 'lucide-react';

let amenities_icons =  {

        "Car_hire" : (
            <>
            <ParkingSquare className="h-8 w-8 text-gray-600" />
            <p className="font-poppins text-black text-base">
                Car Parking
            </p>
            </>
        ),
        "Free Wifi" : (<>
         <Wifi className="h-8 w-8 text-gray-600" />
                                <p className="font-poppins text-black text-base">
                                Free Wifi
                                </p>
        </>),
        "Air Conditioner" : (<>
        <AirVent className="h-8 w-8 text-gray-600" />
                                <p className="font-poppins text-black text-base">
                                    Air Conditioner
                                </p>
        </>),

        "Fitness centre" : (<><Dumbbell className="h-8 w-8 text-gray-600"/>
         <p className="font-poppins text-black text-base">
                                    Fitness centre
                                </p></>),

        "Breakfast" : (<><Utensils className="h-8 w-8 text-gray-600"/>
        <p className="font-poppins text-black text-base">
        Breakfast
                                </p></>),  
    
         "Restaurant" : (<><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-platter"><path d="M12 3V2"/><path d="M5 10a7.1 7.1 0 0 1 14 0"/><path d="M4 10h16"/><path d="M2 14h12a2 2 0 1 1 0 4h-2"/><path d="m15.4 17.4 3.2-2.8a2 2 0 0 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2L5 18"/><path d="M5 14v7H2"/></svg>
         <p className="font-poppins text-black text-base">
         Restaurant
                                </p></>),
         
         "Tea/Coffee Maker in All Rooms" : (<><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h14v2h-2v2q0 .425-.288.713T17 7H9q-.425 0-.712-.288T8 6V4H6v16h4.05q-.95-.675-1.5-1.713T8 16v-5h10v5q0 1.25-.55 2.288T15.95 20H20v2zm7-12q.425 0 .713-.288T14 9t-.288-.712T13 8t-.712.288T12 9t.288.713T13 10"></path></svg>
         <p className="font-poppins text-black text-base">
         Tea/Coffee Maker in All Rooms
                                </p></>),

        "Water park" : (<><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32"><g fill="none"><g fill="currentColor" clipPath="url(#fluentEmojiHighContrastPlaygroundSlide0)"><path d="M3.5 14.047h3.314l-1.148-2.64A4 4 0 0 0 3.5 9.294zm0 4.969h5.483a1.591 1.591 0 0 1-.052-.1l-1.24-2.852H3.5zm0 4.968h5.984V21.03H3.5z"></path><path d="M10.836 1a4.652 4.652 0 0 0-3.082 1.164A4.669 4.669 0 0 0 0 5.672V29a2 2 0 0 0 2 2h1.5a2 2 0 0 0 2-2v-1h1.984v1a2 2 0 0 0 2 2h1.5a2 2 0 0 0 2-2v-5.872l3.155 6.722A2 2 0 0 0 17.95 31H30a2 2 0 0 0 1.816-2.837L27.267 18.3a6.519 6.519 0 0 0-5.9-3.78h-.136l-1.953-4.5a7.51 7.51 0 0 0-3.767-3.837v-.5A4.676 4.676 0 0 0 10.836 1m0 2a2.672 2.672 0 0 1 2.672 2.672v1.942a5.5 5.5 0 0 1 3.932 3.2l2.476 5.7h1.448a4.5 4.5 0 0 1 4.087 2.616L30 29h-1.652L24.2 20l-.111-.24a3 3 0 0 0-2.725-1.744h-1.776A.991.991 0 0 1 19.41 18a1 1 0 0 1-.74-.586l-2.607-6.006A4 4 0 0 0 12.394 9h-.363v-.016l-.023.012V5.672a1.172 1.172 0 0 0-2.344 0v3.312l-1.5-.001V5.672A2.672 2.672 0 0 1 10.836 3M7.344 8.982l-1.5-.001V5.67a1.172 1.172 0 0 0-2.344 0v2.04c.85.242 1.629.68 2.271 1.287a5.509 5.509 0 0 1 1.27 1.815L10.17 18l.007.016v.002h1.448a4.928 4.928 0 0 1 1.99.593c.994.586 1.843 1.533 2.294 2.511L19.601 29H17.95l-3.4-7.25a3.82 3.82 0 0 0-2.922-2.234h-.641V29h-1.5v-3H3.5v3H2V5.672a2.672 2.672 0 0 1 5.344 0z"></path></g><defs><clipPath id="fluentEmojiHighContrastPlaygroundSlide0"><path fill="#fff" d="M0 0h32v32H0z"></path></clipPath></defs></g></svg>
        <p className="font-poppins text-black text-base">
        Water park
                                </p></>),
        "Facilities for disabled guests" : (<><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}><path d="M29.622 35c-1.332 5.176-6.03 9-11.622 9c-6.627 0-12-5.373-12-12c0-4.843 2.869-9.016 7-10.912"></path><path d="m18 12l2 18l15-1l3 11h3"></path><path d="M22 8a4 4 0 1 1-8 0a4 4 0 0 1 8 0m3 12h8"></path></g></svg>
        <p className="font-poppins text-black text-base">
        Facilities for disabled guests
                                </p></>),
        "Free parking" : (<><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-parking"><circle cx="12" cy="12" r="10"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>
        <p className="font-poppins text-black text-base">
            Free parking
                                    </p></>),
        "Room service" : (<><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M2 19v-2h20v2zm1-3v-1q0-3.2 1.963-5.65T10 6.25V6q0-.825.588-1.412T12 4t1.413.588T14 6v.25q3.1.65 5.05 3.1T21 15v1zm2.05-2h13.9q-.35-2.6-2.325-4.3T12 8T7.388 9.7T5.05 14M12 14"></path></svg>
        <p className="font-poppins text-black text-base">
            Room service
                                    </p>
        </>),
        "Family rooms" : (<><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><defs><mask id="ipTFamily0"><g fill="none" stroke="#fff" strokeLinecap="round" strokeWidth={4}><path d="M10 19s-5.143 2-6 9m34-9s5.143 2 6 9m-26-9s4.8 1.167 6 7m6-7s-4.8 1.167-6 7m-4 8s-4.2.75-6 6m14-6s4.2.75 6 6"></path><circle cx={24} cy={31} r={5} fill="#555" strokeLinejoin="round"></circle><circle cx={34} cy={14} r={6} fill="#555" strokeLinejoin="round"></circle><circle cx={14} cy={14} r={6} fill="#555" strokeLinejoin="round"></circle></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTFamily0)"></path></svg>
        <p className="font-poppins text-black text-base">
        Family rooms
                                    </p>
        </>),
        "Swimming Pool" : (<><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M2 15c1.67-.75 3.33-1.5 5-1.83V5a3 3 0 0 1 3-3c1.31 0 2.42.83 2.83 2H10a1 1 0 0 0-1 1v1h5V5a3 3 0 0 1 3-3c1.31 0 2.42.83 2.83 2H17a1 1 0 0 0-1 1v9.94c2-.32 4-1.94 6-1.94v2c-2.22 0-4.44 2-6.67 2c-2.22 0-4.44-2-6.66-2c-2.23 0-4.45 1-6.67 2zm12-7H9v2h5zm0 4H9v1c1.67.16 3.33 1.31 5 1.79zM2 19c2.22-1 4.44-2 6.67-2c2.22 0 4.44 2 6.66 2c2.23 0 4.45-2 6.67-2v2c-2.22 0-4.44 2-6.67 2c-2.22 0-4.44-2-6.66-2c-2.23 0-4.45 1-6.67 2z"></path></svg>
        <p className="font-poppins text-black text-base">
        Swimming Pool
                                    </p>
        </>),
        "Safety features" : (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></>),
        "Cleanliness & disinfecting" : (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M26 20h-6v-2h6zm4 8h-6v-2h6zm-2-4h-6v-2h6z"></path><path fill="currentColor" d="M17.003 20a4.9 4.9 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.7 5.7 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2m-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848M15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.6 16.6 0 0 1 10 24H8a17.3 17.3 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13 13 0 0 0 17.596 28Z"></path></svg></>),
        "General" : (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg></>),
        "Food & drink safety" : (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chef-hat"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/></svg></>),
        "Living Area" : (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.11.89-2 2-2zM5 16h14l-4.5-6l-3.5 4.5l-2.5-3z"></path></svg></>),
        "Physical distancing" : (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m6 21l-4-4l4-4l1.4 1.4L5.8 16h12.4l-1.6-1.6L18 13l4 4l-4 4l-1.4-1.4l1.6-1.6H5.8l1.6 1.6zM2 11v-.575q0-.6.325-1.1t.9-.75q.65-.275 1.338-.425T6 8t1.438.15t1.337.425q.575.25.9.75t.325 1.1V11zm12 0v-.575q0-.6.325-1.1t.9-.75q.65-.275 1.338-.425T18 8t1.438.15t1.337.425q.575.25.9.75t.325 1.1V11zM6 7q-.825 0-1.412-.587T4 5t.588-1.412T6 3t1.413.588T8 5t-.587 1.413T6 7m12 0q-.825 0-1.412-.587T16 5t.588-1.412T18 3t1.413.588T20 5t-.587 1.413T18 7"></path></svg></>),
    };

export default amenities_icons;