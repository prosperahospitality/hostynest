import mongoose from "mongoose";

const locationmaster_districtModel= new mongoose.Schema({
    id: String,
    district: String,
    district_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Locationmaster_District = mongoose.models.locationmaster_district || mongoose.model("locationmaster_district",locationmaster_districtModel)