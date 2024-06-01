import mongoose from "mongoose";

const locationmaster_stateModel= new mongoose.Schema({
    id: String,
    state: String,
    state_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,    
});

export const Locationmaster_State = mongoose.models.locationmaster_state || mongoose.model("locationmaster_state",locationmaster_stateModel)