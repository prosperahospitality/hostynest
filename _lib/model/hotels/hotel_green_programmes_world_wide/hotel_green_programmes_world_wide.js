import mongoose from "mongoose";

const hotel_green_programmes_world_wideModel= new mongoose.Schema({
    Hotel_Id: Number,
    Hotel_name : String,
    Biosphere_Certification_Responsible_Tourism_institute_ITR : Boolean,
    Bureau_Veritas : Boolean,
    Control_Union : Boolean,
    Earth_Check : Boolean,
    Global_Ecosphere_Retreats_GER : Boolean,
    Great_Green_Deal_Certification : Boolean,
    Green_Globe_21 : Boolean,
    Green_Growth_2050 : Boolean,
    Green_Key_Foundatin_for_Environmental_Education_FEE : Boolean,
    Green_Key_Global : Boolean,
    Green_Star : Boolean,
    Green_Tourism_Active : Boolean,
    Greensign : Boolean,
    GreenStep : Boolean,
    Greenview_Portal : Boolean,
    Hilton_Lightstay : Boolean,
    Hostelling_Internationals_Quality_and_Sustainabllity_standard : Boolean,
    IHG_Green_Hotel_Certificate : Boolean,
    Hilton_LightStay : Boolean,
    Hostelling_Internationals_Quality_and_Sustainability_Standard : Boolean,
    Planet_21_Accor : Boolean,
    ISO_14001_Environmental_management : Boolean,
    ISO_50001_Energy_management : Boolean,
    United_Certification_Systems_Limited : Boolean,
    Preferred_by_Nature : Boolean,
    Travelife : Boolean,
    Vireo_Srl : Boolean,
    Wyndham_Green_Certification : Boolean,
        
});

export const Hotel_Green_Programmes_World_Wide = mongoose.models.hotel_green_programmes_world_wide || mongoose.model("hotel_green_programmes_world_wide",hotel_green_programmes_world_wideModel)