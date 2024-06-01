import mongoose from "mongoose";

const hotel_point_of_interestModel= new mongoose.Schema({

    Hotel_Id : Number,
    Hotel_name: String,
    City_centre : String,
    Entertainment_Area : String,
    Golf_course : String,
    Bus_Train_station : String,
    Ski_slopes : String,
    Nearest_Bus_Metro_Stop : String,
    Beach : String,
    Harbour : String,
    Airport : String,

});

export const Hotel_Point_Of_Interest = mongoose.models.hotel_point_of_interest || mongoose.model("hotel_point_of_interest",hotel_point_of_interestModel)