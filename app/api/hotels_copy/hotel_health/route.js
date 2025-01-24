import  db  from "@/_lib/mongoDB";
import { Hotel_Health } from "@/_lib/model/hotels/hotel_health/hotel_health";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Health.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

