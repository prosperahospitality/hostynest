import  db  from "@/_lib/mongoDB";
import { Hotel_Infos } from "@/_lib/model/hotels/hotel_info/hotel_info";
import { Hotel_Facilities } from "@/_lib/model/hotels/hotel_facilities/hotel_facilities";
import { Hotel_Payment_Method } from "@/_lib/model/hotels/hotel_payment_method/hotel_payment_method";
import { Hotel_Point_Of_Interest } from "@/_lib/model/hotels/hotel_point_of_interest/hotel_point_of_interest";
import { NextResponse } from "next/server";
import { Search_Cities } from "@/_lib/model/search_cities";



export async function GET(){
  // db.connect()
  
  // await Hotel_Infos.aggregate([
  //   {
  //     $addFields: 
  //     {
  //           rating: "4.7",
  //           user_review_count: 58,
  //           is_review_available: "1",
  //           hour3_display_flag: 1,
  //           final_display_price_for_3H: 3360,
  //           hour6_display_flag: 1,
  //           final_display_price_for_6H: 3808,
  //           hour12_display_flag: 1,
  //           final_display_price_for_12H: 4480,
  //           hour24_display_flag: 0,
  //           final_display_price_for_24H: 5240,
  //     }
  //   },
  //   {$out: "hotel_infos"}
  // ]);

  // let success = "true";

  // return NextResponse.json({success })
}

export async function POST(request){
  const payload = await request.json();
  let searchCity = payload.searchCity;
  let data = [];
  let facilities = [];
  let payment_method = [];
  let hotel_point_of_interest = [];
  let id = [];
  let success=true;
  let list_id = [];
  let loc;

  try {
    db.connect()

    loc = await Search_Cities.find({"city" : searchCity});

    if(loc.length != 0) {
      data = await Hotel_Infos.find({"Location" : loc[0].location});
    }else{
      data = await Hotel_Infos.find({"Location" : searchCity});
    }
    
    data = data.map((dat) => {
      const updatedData = {
        _id : dat._id,
        Hotel_Id: dat.Hotel_Id,
        Hotel_name: dat.Hotel_name
      };
      Object.keys(dat.toObject()).forEach((field) => {
        if (field !== '_id' && field !== 'Hotel_Id' && field !== 'Hotel_name' && dat[field] !== 'NA' ) {
          updatedData[field] = dat[field];
        }
      });
      return updatedData;
    })

    if(loc.length != 0) {
      id = await Hotel_Infos.find({"Location" : loc[0].location}).select("Hotel_Id");
    }else{
      id = await Hotel_Infos.find({"Location" : searchCity}).select("Hotel_Id");
    }

        id.forEach(async (hotel_id)  => {
            list_id.push(hotel_id.Hotel_Id)
        })

    if(payload.h_ID) {
      facilities = await Hotel_Facilities.find({'Hotel_Id': { $in: payload.h_ID}, 'Hotel_name' : {$ne : null}});
    }else{
      facilities = await Hotel_Facilities.find({'Hotel_Id': { $in: list_id}, 'Hotel_name' : {$ne : null}});
    }
    

    // facilities = facilities.map((facility) => {
    //   if (facility.security_24_hour === false) {
    //     const { security_24_hour, ...rest } = facility.toObject();
    //     return rest;
    //   }else {
    //     return facility.toObject();
    //   }
    // });

    facilities = facilities.map((facility) => {
      const updatedFacility = {
        _id : facility._id,
        Hotel_Id: facility.Hotel_Id,
        Hotel_name: facility.Hotel_name
      };
      Object.keys(facility.toObject()).forEach((field) => {
        if (field !== '_id' && field !== 'Hotel_Id' && field !== 'Hotel_name' && facility[field] === true) {
          updatedFacility[field] = true;
        }
      });
      return updatedFacility;
    })
    
    payment_method = await Hotel_Payment_Method.find({'Hotel_Id': { $in: list_id}});

    payment_method = payment_method.map((pm) => {
      const updatedPayment_Method = {
        _id : pm._id,
        Hotel_Id: pm.Hotel_Id,
        Hotel_name: pm.Hotel_name
      };
      Object.keys(pm.toObject()).forEach((field) => {
        if (field !== '_id' && field !== 'Hotel_Id' && field !== 'Hotel_name' && pm[field] === true) {
          updatedPayment_Method[field] = true;
        }
      });
      return updatedPayment_Method;
    })


    hotel_point_of_interest = await Hotel_Point_Of_Interest.find({'Hotel_Id': { $in: list_id}});

    hotel_point_of_interest = hotel_point_of_interest.map((poi) => {
      const updatedPOI = {
        _id : poi._id,
        Hotel_Id: poi.Hotel_Id,
        Hotel_name: poi.Hotel_name
      };
      Object.keys(poi.toObject()).forEach((field) => {
        if (field !== '_id' && field !== 'Hotel_Id' && field !== 'Hotel_name' && poi[field] !== "0") {
          updatedPOI[field] = poi[field];
        }
      });
      return updatedPOI;
    })


  } catch (error) {
    data={result:"error"}
    success=false;
  }

  return NextResponse.json({ loc, data, facilities, payment_method, hotel_point_of_interest, success })
}




