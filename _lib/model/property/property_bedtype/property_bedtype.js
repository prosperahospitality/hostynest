import mongoose from "mongoose";

const property_bedtypeModel= new mongoose.Schema({
    id: String,
    property_bedtype: String,
    propertybedtype_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Property_Bedtype = mongoose.models.property_bedtype || mongoose.model("property_bedtype",property_bedtypeModel)