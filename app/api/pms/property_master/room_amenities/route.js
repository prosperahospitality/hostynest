import  db  from "@/app/_lib/mongoDB";
import { Pms_Propertymaster_Roomamenities } from "@/app/_lib/model/pms/property_master/room_amenities/room_amenities";
import { NextResponse } from "next/server";

export async function GET(){

//   let hotelId = request.nextUrl.searchParams.get('hotelId');
  let data = [];
  let success=true;
  try {
    db.connect()

    data = await Pms_Propertymaster_Roomamenities.find();
    
    //console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data, success})
}

export async function POST(req){
    const payload = await req.json();
    console.log("Payload: ", payload);
    let data = [];
    let dataAll = [];
    let res = [];
    let success = true;
    await db.connect();

    console.log("Operation: ",payload.operation)

  if(payload.operation === "add"){

          console.log("Add")
          try {
            console.log("payload data::::::::>",payload)

        // await Pms_Propertymaster_Roomamenities.deleteMany({"Hotel_Id": payload.Hotel_Id});

            let search = await Pms_Propertymaster_Roomamenities.find({
              Hotel_Id: payload.Hotel_Id,
              property_area: { $regex: new RegExp(payload.property_area, 'i') },
              property_amenities: { $regex: new RegExp(payload.property_amenities, 'i') },
          });

            console.log("Searching: ",search);
            
          if(search.length === 0) {

            const ress = await Pms_Propertymaster_Roomamenities.create(payload);
            res = await Pms_Propertymaster_Roomamenities.find({"Hotel_Id": payload.Hotel_Id});
            data = { result: "Data inserted successfully" };
            dataAll = await Pms_Propertymaster_Roomamenities.find();

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
        await Pms_Propertymaster_Roomamenities.deleteMany({"Hotel_Id": payload.Hotel_Id});
        return NextResponse.json({ success });
      }else if(payload.operation ==="deleteExtra") {
        await Pms_Propertymaster_Roomamenities.deleteMany({"Hotel_Id": payload.Hotel_Id, property_area: payload.property_area});
        return NextResponse.json({ success });
      }else if(payload.operation ==="reset") {
        await Pms_Propertymaster_Roomamenities.updateMany({ Hotel_Id : payload.Hotel_Id } , {availability : payload.availability});
        return NextResponse.json({ success });
      }


}

