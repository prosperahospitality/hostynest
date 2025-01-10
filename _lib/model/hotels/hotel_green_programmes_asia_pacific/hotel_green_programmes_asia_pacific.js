import mongoose from "mongoose";

const hotel_green_programmes_asia_pacificModel= new mongoose.Schema({

    Hotel_Id : Number,
    Hotel_name : String,
    Asian_Ecotourism_Standard_for_Accommodations : Boolean,
    Centara_Earthcare : Boolean,
    EcoCertification_EA_Australia : Boolean,
    Ecotourism_Australia : Boolean,
    Sakura_Quality_An_ESG_Practice_Standard : Boolean,
    TOFTigers_Initiatives_Pug_mark_Eco_Certification : Boolean,

});

export const Hotel_Green_Programmes_Asia_Pacific = mongoose.models.hotel_green_programmes_asia_pacific || mongoose.model("hotel_green_programmes_asia_pacific",hotel_green_programmes_asia_pacificModel)