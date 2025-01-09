import mongoose from "mongoose";

const locationmaster_cityModel= new mongoose.Schema({
    id: String,
    city: String,
    city_desc: String,
    city_pincode: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Locationmaster_City = mongoose.models.locationmaster_city || mongoose.model("locationmaster_city",locationmaster_cityModel)