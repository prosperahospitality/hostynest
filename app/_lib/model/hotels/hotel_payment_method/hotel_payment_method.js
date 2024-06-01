import mongoose from "mongoose";

const hotel_payment_methodModel= new mongoose.Schema({

    Hotel_Id : Number,
    Hotel_name : String, 
    Americal_Express : Boolean,
    Diners_Club : Boolean,
    EC : Boolean,
    Euro_6ooo : Boolean,
    EuroCard : Boolean,
    JCB : Boolean,
    Maestro : Boolean,
    MasterCard : Boolean,
    Visa : Boolean,
    Visa_Electron : Boolean,
});

export const Hotel_Payment_Method = mongoose.models.hotel_payment_method || mongoose.model("hotel_payment_method",hotel_payment_methodModel)