import mongoose from "mongoose";

const userModel= new mongoose.Schema({
        user_id: String,
        firstname: String,
        lastname: String,
        email: String,
        mobile_number: String,
        hashPassword: String,
        created_date: String,
        favourites: Array,
        delete_flag: Number,
        user_role: String,
});

export const User = mongoose.models.user || mongoose.model("user",userModel);