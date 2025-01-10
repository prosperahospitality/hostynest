import mongoose from "mongoose";

const fands_combsModel= new mongoose.Schema({
    id: String,
    fands_itemid : String,
    fands_item: String,
    fands_categoryid : String,
    fands_category: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const FandS_Combs = mongoose.models.fands_combs || mongoose.model("fands_combs",fands_combsModel)