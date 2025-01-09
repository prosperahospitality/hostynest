import mongoose from "mongoose";

const hotel_things_to_keep_in_mindModel= new mongoose.Schema({

        Hotel_Id : Number,
        Hotel_name : String,
        Cash_Free : Boolean,
        Charges_for_late_arrival : Boolean,
        Children_get_free_accommodation_meals_payable_on_the_spot : Boolean,
        Credit_card_is_compulsory_as_a_deposit_no_deposit_in_cash_is_accepted : Boolean,
        Deposit_on_arrival : Boolean,
        Early_Check_in : Boolean,
        Early_departure : Boolean,
        Flight_information_required : Boolean,
        Identification_card_at_arrival : Boolean,
        LGTBIQ_friendly : Boolean,
        Marriage_certificate_required_for_a_couple_to_share_room : Boolean,
        Minimum_check_in_age : Boolean,
        Naturist : Boolean,
        No_hen_stag_or_any_other_parties_allowed : Boolean,
        Non_smoking_establishment : Boolean,
        Online_check_in : Boolean,
        Online_Check_out : Boolean,
        Only_Adults : Boolean,
        Self_check_in : Boolean,
        Single_Use_Plastic_Free : Boolean,
});

export const Hotel_Things_To_Keep_In_Mind = mongoose.models.hotel_things_to_keep_in_mind || mongoose.model("hotel_things_to_keep_in_mind",hotel_things_to_keep_in_mindModel)