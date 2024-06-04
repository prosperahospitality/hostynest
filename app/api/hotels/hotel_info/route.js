import  db  from "@/app/_lib/mongoDB";
import { Hotel_Infos } from "@/app/_lib/model/hotels/hotel_info/hotel_info";
import { Bank_Details } from "@/app/_lib/model/hotels/bank_details/bank_details";
import { Hotel_Facilities } from "@/app/_lib/model/hotels/hotel_facilities/hotel_facilities";
import { Hotel_Payment_Method } from "@/app/_lib/model/hotels/hotel_payment_method/hotel_payment_method";
import { Hotel_Point_Of_Interest } from "@/app/_lib/model/hotels/hotel_point_of_interest/hotel_point_of_interest";
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
  const payload = await request.json();
  let data = [];
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




