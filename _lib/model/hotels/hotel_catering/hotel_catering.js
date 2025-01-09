import mongoose from "mongoose";

const hotel_cateringModel= new mongoose.Schema({
    Hotel_Id : Number,
    Hotel_name : String,
    dining_24h_cafe : Boolean,
    Air_conditioning_in_Restaurant : Boolean,
    Banquet_hall : Boolean,
    Bar : Boolean,
    Breakfast_room : Boolean,
    Cafe : Boolean,
    Highchairs : Boolean,
    Non_smoking : Boolean,
    Poolside_snack : Boolean,
    Restaurant : Boolean,
    Rooftop_bar : Boolean,
    Show_cooking : Boolean,
    smoking_area : Boolean,
    swim_up_bar : Boolean,
});

export const Hotel_Catering = mongoose.models.hotel_catering || mongoose.model("hotel_catering",hotel_cateringModel)