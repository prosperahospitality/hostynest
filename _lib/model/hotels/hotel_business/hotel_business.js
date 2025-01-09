import mongoose from "mongoose";

const hotel_businessModel= new mongoose.Schema({

    Hotel_Id : Number,
    Hotel_name : String,
    Audio_visual_equipment_rental : Boolean,
    Business_centre : Boolean,
    Confernce_hostess : Boolean,
    Conference_room : Boolean,
    FAX : Boolean,
    Meeting_room : Boolean,
    Photocopler : Boolean,
    Printer : Boolean,
    Projector : Boolean,
    Secretarial_service : Boolean,
      
});

export const Hotel_Business = mongoose.models.hotel_business || mongoose.model("hotel_business",hotel_businessModel)