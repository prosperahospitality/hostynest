import mongoose from "mongoose";

const user_bookingsModel= new mongoose.Schema({
        user_id: String,
        booking_id: String,
        username: String,
        Hotel_Id: Number,
        Hotel_name: String,
        booking_date: String,
        booking_time: String,
        price: String,
        hour3_display_flag : Number,
        hour6_display_flag : Number,
        hour12_display_flag : Number,
        hour24_display_flag : Number,
        status: String,
        adults_count: Number,
        checkin_date: String,
        checkout_date: String,
        checkin_time: String,
        checkout_time: String,
        rooms_count: Number,
        infants_count: Number,
        childrens_count: Number,
        pets_count: Number,
        pflag0 :Number,
        pflag1: Number,
        pflag2: Number,
        pflag3: Number,
        refund_flag: Number,
        created_date: String,
        last_update_on: String,
});



export const User_Bookings = mongoose.models.user_bookings || mongoose.model("user_bookings",user_bookingsModel);


