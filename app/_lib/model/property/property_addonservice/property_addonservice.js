import mongoose from "mongoose";

const property_addonserviceModel= new mongoose.Schema({
    id: String,
    property_addonservice: String,
    propertyaddonservice_desc: String,
    propertyaddonservice_type: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Property_Addonservice = mongoose.models.property_addonservice || mongoose.model("property_addonservice",property_addonserviceModel)