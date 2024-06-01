import mongoose from "mongoose";

const user_bookings_refundModel= new mongoose.Schema({
        id: String,
        user_id: String,
        booking_id: String,
        username: String,
        Hotel_Id: Number,
        Hotel_name: String,
        booking_date: String,
        booking_time: String,
        price: String,
        status: String,
        refund_requested_on: String,
        payment_mode: String,
        refund_status: String,
        rFlag0: Number,
        rFlag1: Number,
        rFlag2: Number,
        rFlag3: Number,
        created_date: String,
        last_update_on: String,
});





export const User_Bookings_Refund = mongoose.models.user_bookings_refund || mongoose.model("user_bookings_refund",user_bookings_refundModel);


