import mongoose from "mongoose";

const property_roomviewModel= new mongoose.Schema({
    id: String,
    property_roomview : String,
    propertyroomview_desc : String,
    status : String,
    creation_date: String,
    last_update_on: String,    
});

export const Property_Roomview = mongoose.models.property_roomview || mongoose.model("property_roomview",property_roomviewModel)