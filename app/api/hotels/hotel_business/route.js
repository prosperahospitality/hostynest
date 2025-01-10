import  db  from "@/_lib/mongoDB";
import { Hotel_Business } from "@/_lib/model/hotels/hotel_business/hotel_business";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Business.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

