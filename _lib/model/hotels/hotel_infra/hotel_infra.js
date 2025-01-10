import mongoose from "mongoose";

const hotel_infraModel= new mongoose.Schema({

    Hotel_Id : Number,
    Hotel_name : String,
    Annexe : Number,
    Apartments : Number,
    Bungalows : Number,
    Executive_rooms : Number,
    Disability_friendly_rooms : Number,
    Double_rooms : Number,
    Number_of_floors_annexe : Number,
    Family_rooms : Number,
    Junior_suites : Number,
    Single_rooms : Number,
    Number_of_floors_main_building : Number,
    Quadruple_rooms : Number,
    Superior_rooms : Number,
    Studios : Number,
    Suites : Number,
    Twin_rooms : Number,
    Total_number_of_rooms : Number,
    Triple_rooms : Number,
    Year_of_most_recent_renovation : Number,
    Villas : Number,
    Year_of_construction : Number,
});

export const Hotel_Infra = mongoose.models.hotel_infra || mongoose.model("hotel_infra",hotel_infraModel)