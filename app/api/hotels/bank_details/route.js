import  db  from "@/_lib/mongoDB";
import { Bank_Details } from "@/_lib/model/hotels/bank_details/bank_details";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Bank_Details.find();
    console.log("rEs::::>",data);

  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}

export async function POST(request){
    const payload = await request.json();
    
    let data = [];
    
    let success=true;
    try {
      db.connect()

      if(payload.operation === "bankByID") {
        // console.log("Inside IF")
        // console.log("Payloadd in if: ",payload)
        data = await Bank_Details.findOne({Hotel_Id : payload.hotelId});
      }else{
        // console.log("Inside Else")
        // console.log("Payloadd in else: ",payload)
        let ress = await Bank_Details.updateOne({Hotel_Id : payload.Hotel_Id}, {id : payload.id,
            bank_name : payload.bank_name,
            account_holder_name : payload.account_holder_name,
            account_number : payload.account_number,
            ifsc_number : payload.ifsc_number,
            pan_number : payload.pan_number,
            created_on : payload.created_on,
            last_updated_on : payload.last_updated_on,
      });

      data = await Bank_Details.findOne({Hotel_Id : payload.Hotel_Id});
      console.log("Data: ",data)
      }



  
    } catch (error) {
      data={result:"error"}
      success=false;
    }
    return NextResponse.json({data,success})
  }

