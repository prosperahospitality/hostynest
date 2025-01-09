import  db  from "@/_lib/mongoDB";
import { List_Hotel } from "@/_lib/model/list_hotel";
import { NextResponse } from "next/server";


export async function GET(req){

  let data = [];

  let success=true;
  try {
    db.connect()

      data = await List_Hotel.find();
    
    
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,success})
}


export async function POST(request){
  const payload = await request.json();
  console.log("Payload::::::::>",payload);
  let result = '';
  let resultAll =[];
  let success=true;
  db.connect();
  try {

    let search = await List_Hotel.find({
      Hotel_name: { $regex: new RegExp(payload.Hotel_name, 'i') },
      contact_number: { $regex: new RegExp(payload.contact_number, 'i') }
    });

    console.log("Search: ",search);
    
    if(search.length === 0) {
      result = await List_Hotel.create(payload);
      resultAll = await List_Hotel.find();
    }else{
      resultAll = await List_Hotel.find();
      result = { result: "Data already existed" };
    }



  } catch (error) {
    console.error("Error fetching data:", error);
    result={result:"error"}
    success=false;
  }
  return NextResponse.json({result, resultAll,success})
  

}

