import mongoose from "mongoose";

const property_roomtypeModel= new mongoose.Schema({
    // id: String,
    // property_name : String,
    // property_type : String,
    // property_bedtype: String,
    // property_extbedtype: String,
    // property_roomview: String,
    // property_rateplan: String,
    // status : String,
    // creation_date: String,
    // last_update_on: String,   
    
    id: String,
    property_roomtype_category : String,
    property_roomname : String,
    status : String,
    creation_date: String,
    last_update_on: String,   
});

export const Property_Roomtype = mongoose.models.property_roomtype || mongoose.model("property_roomtype",property_roomtypeModel)