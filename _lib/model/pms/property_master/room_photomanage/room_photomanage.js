import mongoose from "mongoose";

const pms_propertymaster_roomphotomanageModel= new mongoose.Schema({
    id: String,
    Hotel_Id: Number,
    selected_room: String,
    img_id: Number,
    img_title: String,
    img_tags: Array,
    img_checks: Array,
    include_in_main: Boolean,
    creation_date: String,
    last_update_on: String,
});

export const Pms_Propertymaster_Roomphotomanage = mongoose.models.pms_propertymaster_roomphotomanage || mongoose.model("pms_propertymaster_roomphotomanage",pms_propertymaster_roomphotomanageModel)