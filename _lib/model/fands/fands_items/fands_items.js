import mongoose from "mongoose";

const fands_itemsModel= new mongoose.Schema({
    id: String,
    fands_item: String,
    fandsitem_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const FandS_Items = mongoose.models.fands_items || mongoose.model("fands_items",fands_itemsModel)