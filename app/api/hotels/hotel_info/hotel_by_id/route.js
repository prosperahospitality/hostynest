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

 
    facilities = await Hotel_Facilities.findOne({'Hotel_Id': hotel_id});

      updatedFacility = {
        _id : facilities._id,
        Hotel_Id: facilities.Hotel_Id,
        Hotel_name: facilities.Hotel_name
      };
      Object.keys(facilities.toObject()).forEach((field) => {
        if (facilities[field] === true) {
          updatedFacility[field] = true;
        }
      });

      facilities = updatedFacility;


    payment_method = await Hotel_Payment_Method.findOne({'Hotel_Id': hotel_id});

      updatedPayment_Method = {
        _id : payment_method._id,
        Hotel_Id: payment_method.Hotel_Id,
        Hotel_name: payment_method.Hotel_name
      };
      Object.keys(payment_method.toObject()).forEach((field) => {
        if (payment_method[field] === true) {
          updatedPayment_Method[field] = true;
        }
      });
     
      payment_method = updatedPayment_Method;


    hotel_point_of_interest = await Hotel_Point_Of_Interest.findOne({'Hotel_Id': hotel_id});


      updatedPOI = {
        _id : hotel_point_of_interest._id,
        Hotel_Id: hotel_point_of_interest.Hotel_Id,
        Hotel_name: hotel_point_of_interest.Hotel_name
      };
      Object.keys(hotel_point_of_interest.toObject()).forEach((field) => {
        if (hotel_point_of_interest[field] !== "0") {
          updatedPOI[field] = hotel_point_of_interest[field];
        }
      });
      
      hotel_point_of_interest = updatedPOI;

  } catch (error) {
    data={result:error}
    success=false;
  }
  return NextResponse.json({ data ,facilities, payment_method, hotel_point_of_interest, success })
}