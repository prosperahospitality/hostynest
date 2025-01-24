import  db  from "@/_lib/mongoDB";
import { Hotels } from "@/_lib/model/hotels/all_hotel_info/all_hotel_info";
import { NextResponse } from "next/server";

export async function GET(){
  let data;
  let response;
  let success=true;
  try {
    db.connect()
    data = await Hotels.find();
    // console.log("REsult:::::::>",data);
     response = data;
     console.log("RES:::::>",response[0]);

  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({result:data,success})
}




