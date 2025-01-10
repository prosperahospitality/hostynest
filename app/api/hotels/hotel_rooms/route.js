import  db  from "@/_lib/mongoDB";
import { Hotel_Rooms } from "@/_lib/model/hotels/hotel_rooms/hotel_rooms";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Rooms.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

