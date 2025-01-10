import mongoose from "mongoose";

const hotel_entertainmentModel= new mongoose.Schema({
    Hotel_Id : Number,
    Hotel_name : String,
    Casino : Boolean,
    Children_playground : Boolean,
    Childrens_swimming_area : Boolean,
    Entertainment_programmes_for_adults : Boolean,
    Entertainment_programme_for_children : Boolean,
    Game_room : Boolean,
    Indoor_freshwater_pool : Boolean,
    Indoor_Heated_pool : Boolean,
    Indoor_saltwater_pool : Boolean,
    Kids_club : Boolean,
    Nightclub : Boolean,
    Outdoor_freshwater_pool : Boolean,
    Outdoor_heated_pool : Boolean,
    Outdoor_Rooftop_Swimming_pool : Boolean,
    Outdoor_saltwater_pool : Boolean,
    Parasols : Boolean,
    Pub : Boolean,
    Sun_loungers : Boolean,
    Theatre_auditorium : Boolean,
    TV_Lounge : Boolean,
    Waterpark : Boolean,
    WaterSlides : Boolean,
});

export const Hotel_Entertainment = mongoose.models.hotel_entertainment || mongoose.model("hotel_entertainment",hotel_entertainmentModel)