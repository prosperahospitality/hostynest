import mongoose from "mongoose";

const locationmaster_regionModel= new mongoose.Schema({
    id: String,
    region: String,
    region_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Locationmaster_Region = mongoose.models.locationmaster_region || mongoose.model("locationmaster_region",locationmaster_regionModel)