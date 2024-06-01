import mongoose from "mongoose";

const pms_propertymaster_roomdetailsModel= new mongoose.Schema({
    id: String,
    Hotel_Id: Number,
    floor: String,
    room_no: String,
    room_name: String,
    room_type: String,
    room_rate: String,
    cgst: String,
    sgst: String,
    igst: String,
    extra_adult_price: String,
    extra_child_price: String,
    room_size: String,
    room_size_type: String,
    status: String,
    base_adult: String,
    base_child: String,
    max_adult: String,
    max_child: String,
    max_infant: String,
    max_guest: String,
    creation_date: String,
    last_update_on: String,    
});

export const Pms_Propertymaster_Roomdetails = mongoose.models.pms_propertymaster_roomdetails || mongoose.model("pms_propertymaster_roomdetails",pms_propertymaster_roomdetailsModel)