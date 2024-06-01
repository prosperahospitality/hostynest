import mongoose from "mongoose";

const hotel_sports_and_activitiesModel= new mongoose.Schema({

        Hotel_Id : Number,
        Hotel_name : String,
        Aerobics : Boolean,
        Aqua_fit : Boolean,
        Archery : Boolean,
        Badminton : Boolean,
        Banana_boating : Boolean,
        Basketball : Boolean,
        Beach_Volleyball : Boolean,
        Billards : Boolean,
        Bocce : Boolean,
        Bowling_alley : Boolean,
        Canoeing : Boolean,
        Catamaran_Salling : Boolean,
        Cycling_Mountain_biking : Boolean,
        Darts : Boolean,
        Diving : Boolean,
        Fitness : Boolean,
        Football : Boolean,
        Golf : Boolean,
        Golf_practice_faclity : Boolean,
        Handball : Boolean,
        Horse_riding : Boolean,
        Jet_ski : Boolean,
        Mini_golf : Boolean,
        Motor_board_ride : Boolean,
        Paddle_tennis : Boolean,
        Pedal_boating : Boolean,
        Putting_green : Boolean,
        Safari : Boolean,
        Salling : Boolean,
        Ski_pass : Boolean,
        Skiling : Boolean,
        Snowboarding : Boolean,
        Squash : Boolean,
        Surfing : Boolean,
        Table_Tennis : Boolean,
        Tennis : Boolean,
        Tobogganing : Boolean,
        Villeyball : Boolean,
        Watersking : Boolean,
        Windsurfing : Boolean,
  
});

export const Hotel_Sports_And_Activities = mongoose.models.hotel_sports_and_activities || mongoose.model("hotel_sports_and_activities",hotel_sports_and_activitiesModel)