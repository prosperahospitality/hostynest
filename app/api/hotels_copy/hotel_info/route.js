import  db  from "@/_lib/mongoDB";
import { Hotel_Infos } from "@/_lib/model/hotels/hotel_info/hotel_info";
import { Bank_Details } from "@/_lib/model/hotels/bank_details/bank_details";
import { Hotel_Facilities } from "@/_lib/model/hotels/hotel_facilities/hotel_facilities";
import { Hotel_Payment_Method } from "@/_lib/model/hotels/hotel_payment_method/hotel_payment_method";
import { Hotel_Point_Of_Interest } from "@/_lib/model/hotels/hotel_point_of_interest/hotel_point_of_interest";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Hotel_Infos.find();
  } catch (error) {
    data={result:error}
    success=false;
  }
  return NextResponse.json({data,success})
}

export async function POST(request){
  let payload = await request.json();
  console.log("Payload data rateeeeeee",payload)
  let data = [];
  let res = [];
  let res_facilities;
  let res_payment_Method;
  let res_point_Of_Interest;
  let bank_details;
  let success=true;
  try {
    db.connect()
   

    if(payload.operation === "edit_contactdetails") {
      let ress = await Hotel_Infos.updateOne({Hotel_Id : payload.Hotel_Id}, {id : payload.id,
        Phone_Number : payload.Phone_Number,
        reception_number : payload.reception_number,
        Email : payload.Email,
        secondary_email : payload.secondary_email,
        Address : payload.Address,
    });

    data = await Hotel_Infos.findOne({Hotel_Id : payload.Hotel_Id});
    console.log("Data: ",data)
    }else if(payload.operation === "edit_leaseexpirydate") {
   
      let ress = await Hotel_Infos.updateOne({Hotel_Id : payload.Hotel_Id}, {lease_expiry_date : payload.lease_expiry_date,
    });

    data = await Hotel_Infos.findOne({Hotel_Id : payload.Hotel_Id});
    console.log("Data: ",data)
    }else if(payload.operation === "updateStatus") {
      let ress = await Hotel_Infos.updateOne({Hotel_Id : payload.Hotel_Id}, {status : payload.status});
  
      data = await Hotel_Infos.findOne({Hotel_Id : payload.Hotel_Id});
      console.log("Data: ",data)
    }else if(payload.action === "edit") {
      console.log("Edit",payload.closing_description)
      let ress = await Hotel_Infos.updateOne({Hotel_Id : payload.id}, {Hotel_name : payload.Hotel_name,
        Contact_Name : payload.Contact_Name,
        Phone_Number : payload.Phone_Number,
        Address : payload.Address,
        Location : payload.Location,
        State : payload.State,
        status: payload.status,
        closing_description: payload.closing_description});
  
      data = await Hotel_Infos.find();
      //console.log("Data: ",data)
    }else if(payload.action === "editmany"){

      console.log("Edit many",payload.ids,
      payload.action,
      payload.status, payload.closing_description)
      
      if((payload.ids).join('') === 'all') {
        try {
      
          const property_Roomtype = await Hotel_Infos.updateMany( { } , {status : payload.status, closing_description : payload.closing_description});
        
          res = await Hotel_Infos.find();
        
          console.log("Result Property: ", property_Roomtype);
          data = { result: "Data updated successfully" };
        
        } catch (error) {
        
          console.error("Error:", error);
          data = { result: error };
          success = false;
          
        }
        return NextResponse.json({ data, res, success });
      }else{
        try {
          payload.ids = (payload.ids).map(str => parseInt(str));
          console.log("PayloadLLLLLLLLL>",payload)
          const property_Roomtype = await Hotel_Infos.updateMany({ Hotel_Id: { $in: payload.ids } }, {status : payload.status, closing_description: payload.closing_description.toString()});
        
          res = await Hotel_Infos.find();
        
          console.log("Result Property: ", property_Roomtype);
          data = { result: "Data updated successfully" };
        
        } catch (error) {
        
          console.error("Error:", error);
          data = { result: error };
          success = false;
          
        }
        return NextResponse.json({ data, res, success });
      }
      
      
      
      
      
      
        }else if(payload.operation === "updateHotelRates") {

          let filteredHotels = payload.filteredHotels;

          let lowestRatesObjectsArrayy = payload.lowestRatesObjectsArrayy;

          console.log("Inside updateHotelRates: ",filteredHotels.length,
            lowestRatesObjectsArrayy.length)

          if(filteredHotels.length === lowestRatesObjectsArrayy.length) {
            let a = [];
            filteredHotels.map((item) => {
              lowestRatesObjectsArrayy.map(async (item1) => {
                if(item.Hotel_Id === parseInt(item1.Hotel_Id)) {
                  console.log("Inside updateHotelRates If: ", item.Hotel_Id)
                  a.push(item.Hotel_Id)
                  await Hotel_Infos.updateOne( { Hotel_Id: item.Hotel_Id } , {
                    final_display_price_for_3H : item1.rate_3hr, 
                    final_display_price_for_6H : item1.rate_6hr,
                    final_display_price_for_12H : item1.rate_12hr,
                    final_display_price_for_24H : item1.rate_24hr,
                  });
                }else {
                  console.log("Inside updateHotelRates Else: ", a, item.Hotel_Id)
                  if(a.includes(item.Hotel_Id)) {
                    console.log("Inside updateHotelRates If 1: ", item.Hotel_Id)
                  }else {
                    console.log("Inside updateHotelRates Else 1: ", item.Hotel_Id)
                    await Hotel_Infos.updateOne( { Hotel_Id: item.Hotel_Id } , {
                      final_display_price_for_3H : 0, 
                      final_display_price_for_6H : 0,
                      final_display_price_for_12H : 0,
                      final_display_price_for_24H : 0,
                    });
                  }
                }
              })
            })
          }

          return NextResponse.json({ success });

        }else{
      console.log("payload: ",payload)

      const res = await Hotel_Infos.create(payload.payload);
      res_facilities = await Hotel_Facilities.create(payload.payload_facilities);
      res_payment_Method = await Hotel_Payment_Method.create(payload.payment_Method);
      res_point_Of_Interest = await Hotel_Point_Of_Interest.create(payload.point_Of_Interest);
      bank_details = await Bank_Details.create(payload.bank_details);
      
      data = await Hotel_Facilities.find();
    }

  } catch (error) {
    data={result:error}
    success=false;
  }
  return NextResponse.json({data,res_facilities,success})
}




