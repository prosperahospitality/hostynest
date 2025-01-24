import  db  from "@/_lib/mongoDB";
import { Hotel_Sports_And_Activities } from "@/_lib/model/hotels/hotel_sports_and_activities/hotel_sports_and_activities";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Sports_And_Activities.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

