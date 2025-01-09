import mongoose from "mongoose";

const locationmaster_countryModel= new mongoose.Schema({
    id: String,
    country: String,
    country_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Locationmaster_Country = mongoose.models.locationmaster_country || mongoose.model("locationmaster_country",locationmaster_countryModel)