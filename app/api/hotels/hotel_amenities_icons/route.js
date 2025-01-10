import  db  from "@/_lib/mongoDB";
import { Hotel_Amenities_Icons } from "@/_lib/model/hotels/hotel_amenities_icons/hotel_amenities_icons";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Amenities_Icons.find();
    console.log("rEs::::>",data);

  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

