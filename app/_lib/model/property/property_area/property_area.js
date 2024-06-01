import mongoose from "mongoose";

const property_areaModel= new mongoose.Schema({
    id: String,
    property_area: String,
    propertyarea_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Property_Area = mongoose.models.property_area || mongoose.model("property_area",property_areaModel)