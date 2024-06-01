import mongoose from "mongoose";

const hotelModel= new mongoose.Schema({
        Hotel_Id: Number,
        Hotel_name: String,
        Address: String,
        Official_Category: String,
        Hotel_Type: String,
        Email: String,
        Phone_Number: Number,
        Floor_Number: String,
        State: String,
        Pin_Code: String,
        City: String,
        Country: String,
        Hotel_Description: String,
        Contact_Name: String,
        Check_In: String,
        Check_out: String,
        Phone_Number: String,
});

export const Hotels = mongoose.models.hotels || mongoose.model("hotels",hotelModel)