import mongoose from "mongoose";

const pms_propertymaster_roomamenitiesModel= new mongoose.Schema({
    id: String,
    Hotel_Id: Number,
    property_area: String,
    property_areaId: String,
    property_amenities: String,
    property_amenitiesId: String,
    availability: Array,
    creation_date: String,
    last_update_on: String,
});

export const Pms_Propertymaster_Roomamenities = mongoose.models.pms_propertymaster_roomamenities || mongoose.model("pms_propertymaster_roomamenities",pms_propertymaster_roomamenitiesModel)