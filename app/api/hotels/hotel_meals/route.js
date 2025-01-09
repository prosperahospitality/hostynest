import  db  from "@/_lib/mongoDB";
import { Hotel_Meals } from "@/_lib/model/hotels/hotel_meals/hotel_meals";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Meals.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

