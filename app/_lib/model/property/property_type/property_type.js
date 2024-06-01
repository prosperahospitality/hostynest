import mongoose from "mongoose";

const property_typeModel= new mongoose.Schema({
    id: String,
    property_category : String,
    property_desc : String,
    status : String,
    creation_date: String,
    last_update_on: String,    
});

export const Property_Type = mongoose.models.property_type || mongoose.model("property_type",property_typeModel)