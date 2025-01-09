import  db  from "@/_lib/mongoDB";
import { User } from "@/_lib/model/user";
import { NextResponse } from "next/server";

export async function POST(request){
    const credentials = await request.json();
    console.log("Payload::::::::>",credentials);
    db.connect();
    
    if(credentials.userID && credentials.user_role === "admin") {

      const result = await User.findOne({ user_id : credentials.userID, delete_flag : 0, user_role: "admin"});

      return NextResponse.json({result,success:true})

    } if(credentials.userID && credentials.user_role === "partner") {

      const result = await User.findOne({ user_id : credentials.userID, delete_flag : 0, user_role: "partner"});

      return NextResponse.json({result,success:true})

    }else{

      const result = await User.findOne({ mobile_number : credentials.mobile_number, delete_flag : 0, user_role: "guest"});

      return NextResponse.json({result,success:true})

    }

  }