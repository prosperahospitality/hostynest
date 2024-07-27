import { Locationmaster_Alllocation } from "@/app/_lib/model/locationmaster/locationmaster_alllocation/locationmaster_alllocation";
import { bookingreservation } from "@/app/_lib/model/pms/booking/new_reservation/newreservation";
import { Pms_Ratesandinventory_Managerateandinventory } from "@/app/_lib/model/pms/rates_and_inventory/managerateandinventory/managerateandinventory";
import db from "@/app/_lib/mongoDB"
import { NextResponse } from "next/server";

export async function POST(req) {

    const payload = await req.json();

    await db.connect();

    if (payload.operation === "addbooking") {
        try {

            const { checkindate, checkintime, checkoutdate, checkouttime, dayscount, roomcount, reservationtype, bookingsource, businessource, room, guestname, guestnumber, guestemail, guestaddress, guestcountry, gueststate, guestcity, guestzipcode } = payload;
            console.log(payload, "payload heree");

            const newbooking = new bookingreservation({
                checkindate: checkindate,
                checkintime: checkintime,
                checkoutdate: checkoutdate,
                checkouttime: checkouttime,
                dayscount: dayscount,
                roomcount: roomcount,
                reservationtype: reservationtype,
                bookingsource: bookingsource,
                businessource: businessource,
                room: room,
                guestname: guestname,
                guestnumber: guestnumber,
                guestemail: guestemail,
                guestaddress: guestaddress,
                guestcountry: guestcountry,
                gueststate: gueststate,
                guestcity: guestcity,
                guestzipcode: guestzipcode
            })
            console.log(newbooking, "newbooking");
            await newbooking.save();

            return NextResponse.json({ status: 200, message: "Reservation successfully", newbooking })

        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    }
    else if (payload.operation === "fetchstate") {
        try {

            const showstate = await Locationmaster_Alllocation.find({});
            console.log(showstate, "showstate");

            return NextResponse.json({ status: 200, message: "fetch successfully", showstate })

        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    }
    else if (payload.operation === "fetchcityrespectedtostate") {
        try {

            const { state } = payload;
            console.log(payload, "payload here")

            const fetchcity = await Locationmaster_Alllocation.find({ state });
            console.log(fetchcity, "fetchcity");

            if (!fetchcity) {
                return NextResponse.json({ status: 401, message: "state not found" })
            }

            return NextResponse.json({ status: 200, message: "fetch data", fetchcity })
        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    }
    else if (payload.operation === "fetchziprespectedtocity") {
        try {

            const { city } = payload;
            console.log(payload, "paylod heree");

            const fetchzipcode = await Locationmaster_Alllocation.find({ city });
            console.log(fetchzipcode, "fetchzipcode");

            if (!fetchzipcode) {
                return NextResponse.json({ status: 401, message: "city not found" });
            }

            return NextResponse.json({ status: 200, message: "zipcode fetch successfully", fetchzipcode })
        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    }
    else if (payload.operation === "fetchroom") {
        try {

            const { booking_date } = payload;
            console.log(payload, "payload heree");

            const findFetchRoom = await Pms_Ratesandinventory_Managerateandinventory.find({ booking_date });
            console.log(findFetchRoom, "findFetchRoom");

            if (!findFetchRoom) {
                return NextResponse.json({ status: 401, message: "room not found" });
            }

            return NextResponse.json({ status: 200, message: "room fetch suceesfully", findFetchRoom })

        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    }
    else if (payload.operation === "fetchrate") {
        try {
            const { booking_date, room_type } = payload;
            console.log(payload, "payload heree");

            const findfetchdate = await Pms_Ratesandinventory_Managerateandinventory.find({ booking_date, room_type });
            console.log(findfetchdate, "findfetchdate");

            if (!findfetchdate || findfetchdate.length === 0) {
                return NextResponse.json({ status: 401, message: "rate not found" });
            }

            const formattedRates = findfetchdate.map(rate => ({
                ...rate._doc,
                rate_3hr: rate.rate_3hr.toString(),
                rate_6hr: rate.rate_6hr.toString(),
                rate_12hr: rate.rate_12hr.toString(),
                rate_24hr: rate.rate_24hr.toString()
            }));

            return NextResponse.json({ status: 200, message: "rate fetched successfully", formattedRates });
        } catch (error) {
            console.error("Error during rate fetching:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during rate fetching" });
        }
    }
}