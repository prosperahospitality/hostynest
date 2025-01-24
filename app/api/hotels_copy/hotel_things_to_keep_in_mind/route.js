import  db  from "@/_lib/mongoDB";
import { Hotel_Things_To_Keep_In_Mind } from "@/_lib/model/hotels/hotel_things_to_keep_in_mind/hotel_things_to_keep_in_mind";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Things_To_Keep_In_Mind.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

