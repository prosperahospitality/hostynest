import mongoose from "mongoose";

const property_amenitiesModel= new mongoose.Schema({
    id: String,
    amenities_id: String,
    property_amenities: String,
    amenities_value: String,
    propertyarea_id : String,
    property_area : String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Property_Amenities = mongoose.models.property_amenities || mongoose.model("property_amenities",property_amenitiesModel)