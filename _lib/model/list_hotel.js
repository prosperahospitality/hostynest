import mongoose from "mongoose";

const list_hotelModel= new mongoose.Schema({
        id: String,
        Hotel_name: String,
        Hotel_email: String,
        contact_name: String,
        contact_number: String,
        Hotel_address: String,
        status: String,
        created_date: String,
        last_update_on: String,
});

export const List_Hotel = mongoose.models.list_hotel || mongoose.model("list_hotel",list_hotelModel);


