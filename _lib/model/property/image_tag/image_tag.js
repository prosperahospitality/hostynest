import mongoose from "mongoose";

const image_tagModel= new mongoose.Schema({
    id: String,
    tag_name: String,
    tag_desc: String,
    status: String,
    creation_date: String,
    last_update_on: String,
});

export const Image_Tag = mongoose.models.image_tag || mongoose.model("image_tag",image_tagModel)