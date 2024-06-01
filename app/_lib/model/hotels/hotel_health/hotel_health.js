import mongoose from "mongoose";

const hotel_healthModel= new mongoose.Schema({
    Hotel_Id : Number,
    Hotel_name : String,
    Beauty_salon : Boolean,
    Hairdressing_salon : Boolean,
    Hot_tub : Boolean,
    Massage : Boolean,
    Sauna : Boolean,
    Solarium : Boolean,
    Spa_centre : Boolean,
    Spa_Treatments : Boolean,
    Steam_bath : Boolean,
    Turkish_bath_hamam : Boolean,
});

export const Hotel_Health = mongoose.models.hotel_health || mongoose.model("hotel_health",hotel_healthModel)