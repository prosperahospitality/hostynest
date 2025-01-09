import  db  from "@/_lib/mongoDB";
import { Hotel_Green_Programmes_World_Wide } from "@/_lib/model/hotels/hotel_green_programmes_world_wide/hotel_green_programmes_world_wide";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Green_Programmes_World_Wide.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

