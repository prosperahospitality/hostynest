import db from "@/_lib/mongoDB";
import { Pms_Propertymaster_Roomfands } from "@/_lib/model/pms/property_master/room_fands/room_fands";
import { NextResponse } from "next/server";

export async function GET(req) {

  let hotelId = req.nextUrl.searchParams.get('hotelId');
  let data = [];
  let data1 = [];
  let data_by_id = [];
  let success = true;
  try {
    db.connect()

    data = await Pms_Propertymaster_Roomfands.find();
    data_by_id = await Pms_Propertymaster_Roomfands.find({Hotel_Id : hotelId});

  } catch (error) {
    data = { result: "error" }
    success = false;
  }
  return NextResponse.json({ data, data_by_id, data1, success })
}

export async function POST(req) {
  const payload = await req.json();
  console.log("Payload: ", payload);
  let data = [];
  let dataAll = [];
  let res = [];
  let success = true;
  await db.connect();

  try {

    if (payload.action === "updateAvail") {

      await Pms_Propertymaster_Roomfands.updateMany({ Hotel_Id: payload.Hotel_Id, fands_itemid: { $in: payload.selectedCheckBoxes } }, { $set: { availability: true } });

      await Pms_Propertymaster_Roomfands.updateMany({ Hotel_Id: payload.Hotel_Id, fands_itemid: { $in: payload.prevSelectedCheckBoxes } }, { $set: { availability: false } });

      return NextResponse.json({ success });

    } else if (payload.operation === "reset") {

      await Pms_Propertymaster_Roomfands.updateMany({ Hotel_Id: payload.Hotel_Id }, { availability: payload.availability });

      return NextResponse.json({ success });

    } else if (payload.action === "delete") {

      await Pms_Propertymaster_Roomfands.deleteMany({ Hotel_Id: payload.Hotel_Id, id: { $in: payload.idArr } });

      data = await Pms_Propertymaster_Roomfands.find({ Hotel_Id: payload.Hotel_Id });

      return NextResponse.json({ data, success });

    } else if (payload.action === "addExtra") {

      await Pms_Propertymaster_Roomfands.insertMany(payload.abcd);

      const hotelId = payload.abcd.length > 0 ? payload.abcd[0].Hotel_Id : null;

      if (hotelId) {

        data = await Pms_Propertymaster_Roomfands.find({ Hotel_Id: hotelId });

      } else {

        throw new Error("Hotel_Id is missing from payload.abcd.");

      }

      return NextResponse.json({ data, success });

    } else {

      await Pms_Propertymaster_Roomfands.insertMany(payload);

      data = await Pms_Propertymaster_Roomfands.find({ Hotel_Id: payload.Hotel_Id });

      return NextResponse.json({ data, success });
      
    }

  } catch (error) {
    console.error("Error in POST request:", error);
    success = false;
    return NextResponse.json({ success, message: error.message });
  }

}











// import  db  from "@/_lib/mongoDB";
// import { Pms_Propertymaster_Roomfands } from "@/_lib/model/pms/property_master/room_fands/room_fands";
// import { NextResponse } from "next/server";

// export async function GET(req){

// let hotelId = req.nextUrl.searchParams.get('hotelId');
//   let data = [];
//   let data_by_id = [];
//   let success=true;
//   try {
//     db.connect()

//     data = await Pms_Propertymaster_Roomfands.find();
//     data_by_id = await Pms_Propertymaster_Roomfands.find({Hotel_Id : hotelId});
//     console.log("data_by_id::::>",data_by_id);
//   } catch (error) {
//     data={result:"error"}
//     success=false;
//   }
//   return NextResponse.json({data, data_by_id, success})
// }

// export async function POST(req){
//     const payload = await req.json();
//     console.log("Payload: ", payload);
//     let data = [];
//     let dataAll = [];
//     let res = [];
//     let success = true;
//     await db.connect();
   
//     if(payload.operation === "add"){

//         console.log("Add")
//         try {
//           console.log("payload data::::::::>",payload)

//       // await Pms_Propertymaster_Roomamenities.deleteMany({"Hotel_Id": payload.Hotel_Id});

//           let search = await Pms_Propertymaster_Roomfands.find({
//             Hotel_Id: payload.Hotel_Id,
//             fands_category: { $regex: new RegExp(payload.fands_category, 'i') },
//             fands_item: { $regex: new RegExp(payload.fands_item, 'i') },
//         });

//           console.log("Searching: ",search);
          
//         if(search.length === 0) {

//           const ress = await Pms_Propertymaster_Roomfands.create(payload);
//           res = await Pms_Propertymaster_Roomfands.find({"Hotel_Id": payload.Hotel_Id});
//           data = { result: "Data inserted successfully" };
//           dataAll = await Pms_Propertymaster_Roomfands.find();

//         }else {
//            //  res = await Pms_Propertymaster_Roomdetails.find();
//           //  data = { result: "Data already existed" };
//         }


//       } catch (error) {

//           console.error("Error:", error);
//           data = { result: error };
//           success = false;

//       }
//       return NextResponse.json({ data, dataAll, res, success });


//     }else if(payload.operation === "delete"){
//         await Pms_Propertymaster_Roomfands.deleteMany({"Hotel_Id": payload.Hotel_Id});
//         return NextResponse.json({ success });
//       }else if(payload.operation ==="deleteExtraArea") {

//         let re = payload.fands_category;

//         let promise = re.map(async (item) => {
//           await Pms_Propertymaster_Roomfands.deleteMany({"Hotel_Id": payload.Hotel_Id, fands_category: payload.fands_category});
//         })

//         await Promise.all(promise);

//         let res = await Pms_Propertymaster_Roomfands.find({"Hotel_Id": payload.Hotel_Id});
        
//         return NextResponse.json({ res, success });
//       }else if(payload.operation === "deleteExtraAmenity") {
//         let re1 = payload.fands_category;

//         let promise = re1.map(async (item) => {
//           await Pms_Propertymaster_Roomfands.deleteMany({"Hotel_Id": payload.Hotel_Id, fands_category: item.fands_category, fands_item: item.fands_item});
//         })

//         await Promise.all(promise);
        
//         let res = await Pms_Propertymaster_Roomfands.find({"Hotel_Id": payload.Hotel_Id});
//         return NextResponse.json({ res, success });

//       }else if(payload.operation ==="reset") {
//         await Pms_Propertymaster_Roomfands.updateMany({ Hotel_Id : payload.Hotel_Id } , {availability : payload.availability});
//         return NextResponse.json({ success });
//       }

//     return NextResponse.json({ success });
// }

