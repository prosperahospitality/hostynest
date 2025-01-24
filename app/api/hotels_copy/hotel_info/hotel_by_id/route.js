import  db  from "@/_lib/mongoDB";
import { Hotel_Infos } from "@/_lib/model/hotels/hotel_info/hotel_info";
import { Hotel_Facilities } from "@/_lib/model/hotels/hotel_facilities/hotel_facilities";
import { Hotel_Payment_Method } from "@/_lib/model/hotels/hotel_payment_method/hotel_payment_method";
import { Hotel_Point_Of_Interest } from "@/_lib/model/hotels/hotel_point_of_interest/hotel_point_of_interest";
import { NextResponse } from "next/server";

export async function POST(req){
  const payload = await req.json();
  let data;
  let facilities = [];
  let payment_method = [];
  let hotel_point_of_interest = [];
  let hotel_id = Number(payload.hotelId);
  let filteredData = {};
  let updatedFacility = {};
  let updatedPayment_Method = {};
  let updatedPOI = {};
  let success=true;
  try {
    db.connect()

    //For Single Object
    data = await Hotel_Infos.findOne({"Hotel_Id": hotel_id});

    filteredData = {
          _id : data._id,
          Hotel_Id: data.Hotel_Id,
          Hotel_name: data.Hotel_name
        };

    Object.keys(data.toObject()).forEach((field) => {
          if (data[field] !== "NA" ) {
            filteredData[field] = data[field];
          }
        });

    data = filteredData;


  } catch (error) {
    data={result:error}
    success=false;
  }
  return NextResponse.json({ data, success })
}