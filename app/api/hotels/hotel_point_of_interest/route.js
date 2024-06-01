
import  db  from "@/app/_lib/mongoDB";
import { Hotel_Point_Of_Interest } from "@/app/_lib/model/hotels/hotel_point_of_interest/hotel_point_of_interest";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Point_Of_Interest.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}