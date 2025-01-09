import  db  from "@/_lib/mongoDB";
import { User } from "@/_lib/model/user";
import { NextResponse } from "next/server";

export async function POST(request){
    const credentials = await request.json();
    console.log("Payload::::::::>",credentials.user_id);
    db.connect();

     const userid = { user_id: credentials.user_id };
     const hotelid = credentials.hotel_ID;
     const action = credentials.action;

     if(action === "add") {
        const user = await User.findOne(userid);

        if(user.favourites.includes(hotelid)){
    
            console.log("True");
    
            let result = "Already added to favourite"
    
            return NextResponse.json({result,success:true})
    
        }else{
            console.log("False");
    
            user.favourites.push(hotelid);
    
            const result = await user.save();
        
            return NextResponse.json({result,success:true})
    
        }
     }else if(action === "delete") {
        console.log("Delete")

        const user = await User.findOne(userid);

        if(user.favourites.includes(hotelid)){

            const index = user.favourites.indexOf(hotelid);

            if (index !== -1) {
                console.log("true");
                user.favourites.splice(index, 1); // Remove 1 element at the found index
                const result = await user.save();
                return NextResponse.json({result, success: true});
            } else {
                console.log("false");
                let result = "Already deleted from favourite";
                return NextResponse.json({result, success: true});
            }

    
        }else{
            
            console.log("false");
    
            let result = "Already deleted from favourite"
    
            return NextResponse.json({result,success:true})
        }
     }

    


  }