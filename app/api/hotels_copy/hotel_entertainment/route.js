import  db  from "@/_lib/mongoDB";
import { Hotel_Entertainment } from "@/_lib/model/hotels/hotel_entertainment/hotel_entertainment";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Entertainment.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

