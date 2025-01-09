import  db  from "@/_lib/mongoDB";
import { Hotel_Green_Programmes_Asia_Pacific } from "@/_lib/model/hotels/hotel_green_programmes_asia_pacific/hotel_green_programmes_asia_pacific";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Green_Programmes_Asia_Pacific.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

