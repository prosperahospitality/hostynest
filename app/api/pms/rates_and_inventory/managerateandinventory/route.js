import  db  from "@/_lib/mongoDB";
import { Pms_Ratesandinventory_Managerateandinventory } from "@/_lib/model/pms/rates_and_inventory/managerateandinventory/managerateandinventory";
import { NextResponse } from "next/server";

export async function GET(request){

  let hotelId = request.nextUrl.searchParams.get('hotelId');
  let selectedRoom = request.nextUrl.searchParams.get('selectedRoom');
  let rowDataID = request.nextUrl.searchParams.get('rowDataID');
  let searchedDate = request.nextUrl.searchParams.get('searchedDate');
  
  let data = [];
  let databydate = [];
  let databyid = [];
  let databyHoteliddd = [];
  let rowbyid = [];
  let success=true;
  try {
    db.connect()

    data = await Pms_Ratesandinventory_Managerateandinventory.find();
    databydate = await Pms_Ratesandinventory_Managerateandinventory.find({"booking_date": searchedDate});
    databyid = await Pms_Ratesandinventory_Managerateandinventory.find({"Hotel_Id": hotelId , "room_type": selectedRoom});
    databyHoteliddd = await Pms_Ratesandinventory_Managerateandinventory.find({"Hotel_Id": hotelId, "booking_date": searchedDate });
    rowbyid = await Pms_Ratesandinventory_Managerateandinventory.findOne({"id": rowDataID});
    
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data, databyid, databydate, rowbyid, databyHoteliddd, success})
}

export async function POST(req){

  const payload = await req.json();

  let data = [];
  let databyid = [];

  let dataExisted = [];
  let dataAll = [];
  let success = true;
  await db.connect();

  if(payload.operation === "edit") {


    const pms_propertymaster_roomdetails = await Pms_Ratesandinventory_Managerateandinventory.updateOne({ id: payload.rowDataID }, 
      {
        rate_3hr: payload.hr3Rate,
        rate_6hr: payload.hr6Rate,
        rate_12hr: payload.hr12Rate,
        rate_24hr: payload.hr24Rate,
        total_rooms_count: payload.totalRooms,
        first_checkin_last_checkout_3hr: payload.first_checkin_last_checkout_3hr,
        first_checkin_last_checkout_6hr: payload.first_checkin_last_checkout_6hr,
        first_checkin_last_checkout_12hr: payload.first_checkin_last_checkout_12hr,
        first_checkin_last_checkout_status_3hr: payload.first_checkin_last_checkout_status_3hr,
        first_checkin_last_checkout_status_6hr: payload.first_checkin_last_checkout_status_6hr,
        first_checkin_last_checkout_status_12hr: payload.first_checkin_last_checkout_status_12hr,
        status: payload.status,
      });

      dataAll = await Pms_Ratesandinventory_Managerateandinventory.find({"Hotel_Id": payload.Hotel_Id , "room_type": payload.room_type});

  }else if(payload.operation === "bulkEdit") {
    
    payload.formattedDates.map(async(item) => {
      let search = await Pms_Ratesandinventory_Managerateandinventory.find({
        Hotel_Id: payload.Hotel_Id,
        booking_date: { $regex: new RegExp(item, 'i') },
        status: { $regex: new RegExp(payload.status, 'i') },
        room_type: { $regex: new RegExp(payload.selectedRoom, 'i') },
      });
      if(search.length === 0) {
        await Pms_Ratesandinventory_Managerateandinventory.updateMany({ Hotel_Id: payload.Hotel_Id, booking_date: item }, 
          {
            status: payload.status,
          })
          databyid = await Pms_Ratesandinventory_Managerateandinventory.find({"Hotel_Id": payload.Hotel_Id , "room_type": payload.selectedRoom});
      }else{

        success = false;
      }

    })
}else if(payload.operation === "bulkUpdateProp") {
 
  payload.formattedDates.map(async(item) => {
    let search = await Pms_Ratesandinventory_Managerateandinventory.find({
      Hotel_Id: payload.Hotel_Id,
      booking_date: { $regex: new RegExp(item, 'i') },
      status: { $regex: new RegExp(payload.status, 'i') },
      room_type: { $regex: new RegExp(payload.selectedRoom, 'i') },
    });
    if(search.length === 0) {
      await Pms_Ratesandinventory_Managerateandinventory.updateMany({ Hotel_Id: payload.Hotel_Id, booking_date: item, room_type: payload.selectedRoom }, 
        {
          status: payload.status,
        })
    }else{
     
      success = false;
    }

  })
}else if(payload.operation === "bulkUpdateRoom") {
  
  payload.formattedDates.map(async(item) => {
    let search = await Pms_Ratesandinventory_Managerateandinventory.find({
      Hotel_Id: payload.Hotel_Id,
      booking_date: { $regex: new RegExp(item, 'i') },
      total_rooms_count: payload.totalRooms,
      room_type: { $regex: new RegExp(payload.selectedRoom, 'i') },
    });
    console.log("Search res: ",search)
    if(search.length === 0) {
      await Pms_Ratesandinventory_Managerateandinventory.updateMany({ Hotel_Id: payload.Hotel_Id, booking_date: item, room_type: payload.selectedRoom }, 
        {
          total_rooms_count: payload.totalRooms,
        })
    }else{
      console.log("False")
      success = false;
    }

  })
}else if(payload.operation === "bulkUpdateRate") {

  payload.formattedDates.map(async(item) => {
    // let search = await Pms_Ratesandinventory_Managerateandinventory.find({
    //   Hotel_Id: payload.Hotel_Id,
    //   booking_date: { $regex: new RegExp(item, 'i') },
    //   status: { $regex: new RegExp(payload.status, 'i') },
    //   room_type: { $regex: new RegExp(payload.selectedRoom, 'i') },
    // });
    // console.log("Search res: ",search)
    // if(search.length === 0) {
      await Pms_Ratesandinventory_Managerateandinventory.updateMany({ Hotel_Id: payload.Hotel_Id, booking_date: item, room_type: payload.selectedRoom }, 
        {
          rate_3hr: payload.rate_3hr,
          rate_6hr: payload.rate_6hr,
          rate_12hr: payload.rate_12hr,
          rate_24hr: payload.rate_24hr,
          rate_child: payload.rate_child,
          rate_extraperson: payload.rate_extraperson,
        })
    // }else{
    //   console.log("False")
    //   success = false;
    // }

  })
}else{

    //await Pms_Ratesandinventory_Managerateandinventory.deleteMany();
    if(payload.user_id) {
      // let search1 = await Pms_Ratesandinventory_Managerateandinventory.find({
      //   booking_date: { $regex: new RegExp(payload.booking_date, 'i') },
      //   room_type: { $regex: new RegExp(payload.room_type, 'i') },
      // });
  
      // console.log("Search 1:",search1)
  
      let search = await Pms_Ratesandinventory_Managerateandinventory.find({
        Hotel_Id: payload.Hotel_Id,
        booking_date: { $regex: new RegExp(payload.booking_date, 'i') },
        user_id: { $regex: new RegExp(payload.user_id, 'i') },
        room_type: { $regex: new RegExp(payload.room_type, 'i') },
      });
  
      // if(search1.length === 1) {
      //   dataExisted = { result: "Data already existed" };
      //   success = false;
      // }else{
        if(search.length === 0) {
          await Pms_Ratesandinventory_Managerateandinventory.create(payload);
          data = await Pms_Ratesandinventory_Managerateandinventory.find({"Hotel_Id": payload.Hotel_Id});
          dataAll = await Pms_Ratesandinventory_Managerateandinventory.find();
        }else {
          dataExisted = { result: "Data already existed" };
          success = false;
        }
      //}
    }else{
      console.log("No user id")
    }
    }
    

  
  return NextResponse.json({ data, dataAll, databyid, success });
}



