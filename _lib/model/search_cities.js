import mongoose from "mongoose";

const search_cityModel= new mongoose.Schema({
    country : String,
    state : String,
    sub_division : String,
    location : String,
    value : String,
    city : String,
    pin : Number,
    latitude : Number,
    longitude : Number     
});

export const Search_Cities = mongoose.models.search_cities || mongoose.model("search_cities", search_cityModel)