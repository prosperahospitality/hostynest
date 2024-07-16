import mongoose from "mongoose";

const property_roomtype_categoryModel= new mongoose.Schema({
    id: String,
    property_roomtype_category: String,
    property_roomtype_category_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Property_Roomtype_Category = mongoose.models.property_roomtype_category || mongoose.model("property_roomtype_category", property_roomtype_categoryModel)