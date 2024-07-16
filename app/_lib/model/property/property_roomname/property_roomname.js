import mongoose from "mongoose";

const property_roomnameModel= new mongoose.Schema({
    id: String,
    property_roomname: String,
    property_roomname_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Property_Roomname = mongoose.models.property_roomname || mongoose.model("property_roomname", property_roomnameModel)