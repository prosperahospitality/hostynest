import mongoose from "mongoose";

const locationmaster_alllocationModel= new mongoose.Schema({
    id: String,
    region: String,
    country: String,
    state: String,
    district: String,
    city: String,
    city_pincode: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Locationmaster_Alllocation = mongoose.models.locationmaster_alllocation || mongoose.model("locationmaster_alllocation",locationmaster_alllocationModel)