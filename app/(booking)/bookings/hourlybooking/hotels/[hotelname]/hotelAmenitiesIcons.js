'use client'
import { Crown, Dot, Star, MapPin, Heart, Share2, Hotel, CreditCard, Wifi, AirVent, Tv, Milk, ParkingSquare, MessageCircleHeart, Wallet, BatteryCharging, Refrigerator, WashingMachine, Cctv, Check } from 'lucide-react';

let amenities_icons =  {

        "Car_hire" : (
            <>
            <ParkingSquare className="h-8 w-8 text-gray-600" />
            <p className="font-poppins text-black text-base">
                Car Parking
            </p>
            </>
        ),
        "wi_fi" : (<>
         <Wifi className="h-8 w-8 text-gray-600" />
                                <p className="font-poppins text-black text-base">
                                    Wifi Based Internet
                                </p>
        </>),
        "Air_conditioning_in_public_areas" : (<>
        <AirVent className="h-8 w-8 text-gray-600" />
                                <p className="font-poppins text-black text-base">
                                    Air Conditioner
                                </p>
        </>)  
    
    
        };

export default amenities_icons;