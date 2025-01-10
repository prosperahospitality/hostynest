import mongoose from "mongoose";

const property_extbedtypeModel= new mongoose.Schema({
    id: String,
    property_extbedtype: String,
    propertyextbedtype_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Property_Extbedtype = mongoose.models.property_extbedtype || mongoose.model("property_extbedtype",property_extbedtypeModel)