import  db  from "@/_lib/mongoDB";
import { User_Bookings_Refund } from "@/_lib/model/refund";
import { NextResponse } from "next/server";


export async function GET(req){
  let user_Id = req.nextUrl.searchParams.get('user_Id');
  let booking_id = req.nextUrl.searchParams.get('booking_id');
  let data = [];
  let data_refund = [];
  let data_All = [];
  let data_refund_booking = [];
  let success=true;
  try {
    db.connect()
    // data = await User_Bookings_Refund.find({user_id : user_Id});
    // data_refund = await User_Bookings_Refund.find({user_id : user_Id, refund_flag : 1});
    data_All = await User_Bookings_Refund.find();

    if(booking_id) {
      data_refund_booking = await User_Bookings_Refund.findOne({user_id : user_Id, refund_status : "active", booking_id : booking_id});
    }
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data, data_refund, data_All, data_refund_booking, success})
}

export async function POST(req){
  const payload = await req.json();
  console.log("Payload: ", payload);
  let data = [];
  let dataAll = [];
  let res = [];
  let success = true;
  await db.connect();

try {

    let search = await User_Bookings_Refund.find({
      user_id: { $regex: new RegExp(payload.user_id, 'i') },
      booking_id: { $regex: new RegExp(payload.booking_id, 'i') },
    });

    console.log("Search: ",search);
    
    if(search.length === 0) {
      const user_bookings = await User_Bookings_Refund.create(payload);
      res = await User_Bookings_Refund.find({"user_id": payload.user_id});
      console.log("Result Property: ", user_bookings);
      data = { result: "Data inserted successfully" };
      dataAll = await User_Bookings_Refund.find();
    }else {
    res = await User_Bookings_Refund.find();
    data = { result: "Data already existed" };
    }

} catch (error) {

  console.error("Error:", error);
  data = { result: error };
  success = false;

}
return NextResponse.json({ data, dataAll, res, success });
}
