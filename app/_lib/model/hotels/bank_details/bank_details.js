import mongoose from "mongoose";

const bank_detailsModel= new mongoose.Schema({
    id: String,
    Hotel_Id: Number,
    bank_name: String,
    account_holder_name: String,
    account_number: String,
    ifsc_number: String,
    pan_number: String,
    status: String,
    created_on: String,
    last_updated_on: String,
});

export const Bank_Details = mongoose.models.bank_details || mongoose.model("bank_details",bank_detailsModel)