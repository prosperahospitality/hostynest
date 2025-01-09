import  db  from "@/_lib/mongoDB";
import { Hotel_Health_And_Safety_Covid } from "@/_lib/model/hotels/hotel_health_and_safety_covid/hotel_health_and_safety_covid";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Health_And_Safety_Covid.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

