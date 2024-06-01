import mongoose from "mongoose";

const fands_categorysModel= new mongoose.Schema({
    id: String,
    fands_category: String,
    fandscategory_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const FandS_Categorys = mongoose.models.fands_categorys || mongoose.model("fands_categorys",fands_categorysModel)