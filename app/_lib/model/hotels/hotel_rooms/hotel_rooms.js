import mongoose from "mongoose";

const hotel_roomsModel= new mongoose.Schema({
    
    Hotel_Id : Number,
    Hotel_name : String,
    Room_Type : String,
    Characteristics : String,
    Number_of_bedrooms : Number,
    Number_of_living_room : Number,
    Queen_size_bed_150_154_width : Number,
    King_size_bed_150_183_width : Number,
    Double_bed_131_150_width : Number,
    Sofa_bed : Number,
    Bunk_beds : Number,
    Rollaways_on_demand : Number,
    Single_bed_80_130_width : Number,
    Max_Capacity : Number,
    Min_Total : Number,
    Max_Adults : Number,
    Min_Adults : Number,
    Max_Children : Number,
    Max_Babies : Number,

});

export const Hotel_Rooms = mongoose.models.hotel_rooms || mongoose.model("hotel_rooms",hotel_roomsModel)