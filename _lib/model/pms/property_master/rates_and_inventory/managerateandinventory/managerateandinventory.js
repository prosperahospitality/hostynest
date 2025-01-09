import mongoose from "mongoose";

const pms_ratesandinventory_managerateandinventoryModel= new mongoose.Schema({
    id: String,
    Hotel_Id: Number,
    Hotel_name: String,
    user_id: String,
    user_name: String,
    booking_date: String,
    room_type: String,
    price_per_guest_flag: Boolean,
    room_occupancy: Number,
    rate_3hr: Number,
    rate_6hr: Number,
    rate_12hr: Number,
    rate_24hr: Number,
    rate_child: Number,
    rate_extraperson: Number,
    total_rooms_count: Number,
    booked_rooms_count: Number,
    first_checkin_last_checkout_3hr: String,
    first_checkin_last_checkout_6hr: String,
    first_checkin_last_checkout_12hr: String,
    first_checkin_last_checkout_24hr: String,
    first_checkin_last_checkout_status_3hr: String,
    first_checkin_last_checkout_status_6hr: String,
    first_checkin_last_checkout_status_12hr: String,
    first_checkin_last_checkout_status_24hr: String,
    status: String,
    creation_date: String,
    last_update_on: String,
});

export const Pms_Ratesandinventory_Managerateandinventory = mongoose.models.pms_ratesandinventory_managerateandinventory || mongoose.model("pms_ratesandinventory_managerateandinventory",pms_ratesandinventory_managerateandinventoryModel)