import  db  from "@/_lib/mongoDB";
import { User_Bookings } from "@/_lib/model/bookings";
import { NextResponse } from "next/server";


export async function GET(req){
  let user_Id = req.nextUrl.searchParams.get('user_Id');
  
  let data = [];
  let data_refund = [];
  let data_All = [];
  let success=true;
  try {
    db.connect()
    data = await User_Bookings.find({user_id : user_Id});
    data_refund = await User_Bookings.find({user_id : user_Id, refund_flag : 1});
    data_All = await User_Bookings.find();

  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data, data_refund, data_All, success})
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

  if(payload.operation === "update") {
    const res = await User_Bookings.updateOne({ user_id: payload.user_id, booking_id: payload.booking_id }, {refund_flag: 1});
    return NextResponse.json({ data, dataAll, res, success });
  }else if(payload.operation === "delete_by_id") {

    try {

        const delete_res = await User_Bookings.deleteOne({user_id: payload.user_id, booking_id : payload.booking_id});
        res = { result: "Data deleted successfully" };
        console.log("Result Property: ", delete_res);
        data = await User_Bookings.find({user_id : payload.user_id});
        dataAll = await User_Bookings.find();

    } catch (error) {

        console.error("Error:", error);
        data = { result: error };
        success = false;

    }
    return NextResponse.json({ data, dataAll, res, success });

  }else{
    let search = await User_Bookings.find({
      user_id: { $regex: new RegExp(payload.user_id, 'i') },
      Hotel_Id: payload.Hotel_Id,
      Hotel_name: { $regex: new RegExp(payload.Hotel_name, 'i') }
    });

    console.log("Search: ",search);
    
    if(search.length === 0) {
      const user_bookings = await User_Bookings.create(payload);
      res = await User_Bookings.find({"user_id": payload.user_id});
      console.log("Result Property: ", user_bookings);
      data = { result: "Data inserted successfully" };
      dataAll = await User_Bookings.find();
    }else {
    res = await User_Bookings.find();
    data = { result: "Data already existed" };
    }

    return NextResponse.json({ data, dataAll, res, success });
  }

} catch (error) {

  console.error("Error:", error);
  data = { result: error };
  success = false;

}
return NextResponse.json({ data, dataAll, res, success });
}

