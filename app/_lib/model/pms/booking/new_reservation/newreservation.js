import mongoose, { Schema } from "mongoose";

const newreservationSchema = new Schema({
    checkindate: {
        type: String,
        required: true,
    },
    checkintime: {
        type: String,
        required: true,
    },
    checkoutdate: {
        type: String,
        required: true,
    },
    checkouttime: {
        type: String,
        required: true,
    },
    dayscount: {
        type: String,
        required: true,
    },
    roomcount: {
        type: String,
        required: true,
    },
    reservationtype: {
        type: String,
        required: true,
    },
    bookingsource: {
        type: String,
        required: true,
    },
    businessource: {
        type: String,
        required: true,
    },
    room: [{
        roomtype: {
            type: String,
            required: true,
        },
        rate: {
            type: String,
            required: true,
        },
        adultcount: {
            type: String,
            required: true,
        },
        childcount: {
            type: String,
            required: true,
        },
    }],
    guestname: {
        type: String,
        required: true,
    },
    guestnumber: {
        type: String,
        required: true,
    },
    guestemail: {
        type: String,
        required: true,
    },
    guestaddress: {
        type: String,
        required: true,
    },
    guestcountry: {
        type: String,
        required: true,
    },
    gueststate: {
        type: String,
        required: true,
    },
    guestcity: {
        type: String,
        required: true,
    },
    guestzipcode: {
        type: String,
        required: true,
    }
})

export const bookingreservation = mongoose.models.bookingreservation || mongoose.model("bookingreservation", newreservationSchema)

