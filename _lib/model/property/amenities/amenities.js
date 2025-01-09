import mongoose from "mongoose";

const amenitiesModel= new mongoose.Schema({
    id: String,
    amenities: String,
    amenities_desc: String,
    value: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Amenities = mongoose.models.amenities || mongoose.model("amenities",amenitiesModel)