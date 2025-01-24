import db from "@/_lib/mongoDB";
import { Pms_Ratesandinventory_Managerateandinventory } from "@/_lib/model/pms/rates_and_inventory/managerateandinventory/managerateandinventory";
import { NextResponse } from "next/server";
import { parse, isBefore } from 'date-fns';

export async function GET(req) {
  try {

    db.connect()

    let data = [];
    let dataAll = [];
    let success = true;

    let hotelId = req.nextUrl.searchParams.get('hotelId');
    let selectedRoomid = req.nextUrl.searchParams.get('selectedRoomid');
    let type = req.nextUrl.searchParams.get('type');

    if (type === "allrooms") {

      dataAll = await Pms_Ratesandinventory_Managerateandinventory.find({ "Hotel_Id": hotelId });
      return NextResponse.json({ dataAll, success })

    } else {

      data = await Pms_Ratesandinventory_Managerateandinventory.find({ "Hotel_Id": hotelId, "room_id": selectedRoomid });
      return NextResponse.json({ data, success })

    }

  } catch (error) {
    data = { result: "error" }
    success = false;

    return NextResponse.json({ data, success })
  }

}

export async function POST(req) {

  await db.connect();

  const payload = await req.json();

  console.log("Payload:::::>", payload)

  let data = [];
  let success = true;

  if (payload.action === "deleteOldDates") {

    try {

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const records = await Pms_Ratesandinventory_Managerateandinventory.find();

      const oldRecords = records.filter(record => {
        const bookingDate = parse(record.booking_dateF, 'dd-MM-yyyy', new Date()); // updated
        return isBefore(bookingDate, currentDate);
      });

      const oldRecordIds = oldRecords.map(record => record._id);
      if (oldRecordIds.length > 0) {
        await Pms_Ratesandinventory_Managerateandinventory.deleteMany({ _id: { $in: oldRecordIds } });
      } else {
        console.log("No old records found to delete.");
      }
    } catch (error) {
      console.error("Error::::::::>", error);
      success = false;
    }

    return NextResponse.json({ data, success });

  } else if (payload.action === "deleteConditionally") {

    const result = await Pms_Ratesandinventory_Managerateandinventory.find({ "Hotel_Id": payload.hotelId });

    const filteredResult = result.filter((item) => (item.action === "" && item.quick_action === "" && item.bulk_action === "") || (item.action === "" && item.quick_action === "updated to bookable" && item.bulk_action === ""));

    const filteredIds = filteredResult.map((item) => item._id.toString());

    if(filteredIds.length > 0) {

      await Pms_Ratesandinventory_Managerateandinventory.deleteMany({ _id: { $in: filteredIds } });

    }

    return NextResponse.json({ data, success });

  } else {

    for (const record of payload) {

      if (record._id) {
        delete record._id;
      }

      const result = await Pms_Ratesandinventory_Managerateandinventory.updateOne(
        {
          Hotel_Id: record.Hotel_Id,
          booking_dateF: { $regex: new RegExp(record.booking_dateF, 'i') },
          id: { $regex: new RegExp(record.id, 'i') },
          room_id: { $regex: new RegExp(record.room_id, 'i') },
        },
        { $set: record },
        { upsert: true }
      );

      data.push(result);
    }

    return NextResponse.json({ data, success });

  }

}



