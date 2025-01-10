import mongoose from "mongoose";

const pms_propertymaster_roomfandsModel= new mongoose.Schema({
    id: String,
    Hotel_Id: Number,
    fands_itemid: String,
    fands_item: String,
    fands_categoryid: String,
    fands_category: String,
    availability: Boolean,
    creation_date: String,
    last_update_on: String,
});

export const Pms_Propertymaster_Roomfands = mongoose.models.pms_propertymaster_roomfands || mongoose.model("pms_propertymaster_roomfands",pms_propertymaster_roomfandsModel)