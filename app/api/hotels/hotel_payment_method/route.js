import  db  from "@/_lib/mongoDB";
import { Hotel_Payment_Method } from "@/_lib/model/hotels/hotel_payment_method/hotel_payment_method";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Payment_Method.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

