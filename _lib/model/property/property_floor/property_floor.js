import mongoose from "mongoose";

const property_floorModel= new mongoose.Schema({
    id: String,
    property_floor: String,
    propertyfloor_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Property_Floor = mongoose.models.property_floor || mongoose.model("property_floor",property_floorModel)