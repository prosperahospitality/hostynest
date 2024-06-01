import  db  from "@/app/_lib/mongoDB";
import { Pms_Propertymaster_Roomfands } from "@/app/_lib/model/pms/property_master/room_fands/room_fands";
import { NextResponse } from "next/server";

export async function GET(req){

let hotelId = req.nextUrl.searchParams.get('hotelId');
  let data = [];
  let data_by_id = [];
  let success=true;
  try {
    db.connect()

    data = await Pms_Propertymaster_Roomfands.find();
    data_by_id = await Pms_Propertymaster_Roomfands.find({Hotel_Id : hotelId});
    console.log("data_by_id::::>",data_by_id);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data, data_by_id, success})
}

export async function POST(req){
    const payload = await req.json();
    console.log("Payload: ", payload);
    let data = [];
    let dataAll = [];
    let res = [];
    let success = true;
    await db.connect();
   
    if(payload.operation === "add"){

        console.log("Add")
        try {
          console.log("payload data::::::::>",payload)

      // await Pms_Propertymaster_Roomamenities.deleteMany({"Hotel_Id": payload.Hotel_Id});

          let search = await Pms_Propertymaster_Roomfands.find({
            Hotel_Id: payload.Hotel_Id,
            fands_category: { $regex: new RegExp(payload.fands_category, 'i') },
            fands_item: { $regex: new RegExp(payload.fands_item, 'i') },
        });

          console.log("Searching: ",search);
          
        if(search.length === 0) {

          const ress = await Pms_Propertymaster_Roomfands.create(payload);
          res = await Pms_Propertymaster_Roomfands.find({"Hotel_Id": payload.Hotel_Id});
          data = { result: "Data inserted successfully" };
          dataAll = await Pms_Propertymaster_Roomfands.find();

        }else {
           //  res = await Pms_Propertymaster_Roomdetails.find();
          //  data = { result: "Data already existed" };
        }


      } catch (error) {

          console.error("Error:", error);
          data = { result: error };
          success = false;

      }
      return NextResponse.json({ data, dataAll, res, success });


    }else if(payload.operation === "delete"){
        await Pms_Propertymaster_Roomfands.deleteMany({"Hotel_Id": payload.Hotel_Id});
        return NextResponse.json({ success });
      }else if(payload.operation ==="deleteExtra") {
        await Pms_Propertymaster_Roomfands.deleteMany({"Hotel_Id": payload.Hotel_Id, fands_category: payload.fands_category});
        return NextResponse.json({ success });
      }else if(payload.operation ==="reset") {
        await Pms_Propertymaster_Roomfands.updateMany({ Hotel_Id : payload.Hotel_Id } , {availability : payload.availability});
        return NextResponse.json({ success });
      }

    return NextResponse.json({ success });
}
