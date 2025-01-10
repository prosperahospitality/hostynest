import  db  from "@/_lib/mongoDB";
import { Locationmaster_City } from "@/_lib/model/locationmaster/locationmaster_city/locationmaster_city";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Locationmaster_City.find();
  } catch (error) {
    data={result:error}
    success=false;
  }
  return NextResponse.json({data,success})
}

export async function POST(req){
    const payload = await req.json();
    console.log("Payload: ", payload);
    let data = [];
    let res = [];
    let success = true;
    await db.connect();

    if(payload.action === "edit"){

      console.log("Edit")

      try {

          const locationmaster_City = await Locationmaster_City.updateOne({ id: payload.id }, {city : payload.city,
            city_desc : payload.cityDesc,
            city_pincode : payload.city_pincode,
            status : payload.status});

          res = await Locationmaster_City.find();

          console.log("Result Property: ", locationmaster_City);
          data = { result: "Data updated successfully" };

      } catch (error) {

          console.error("Error:", error);
          data = { result: error };
          success = false;
          
      }
      return NextResponse.json({ data, res, success });

    }else if(payload.action === "delete"){
      console.log("Delete")
      try {

          const locationmaster_City = await Locationmaster_City.deleteOne({id : payload.id});
          res = await Locationmaster_City.find();
          console.log("Result Property: ", locationmaster_City);
          data = { result: "Data deleted successfully" };

      } catch (error) {

          console.error("Error:", error);
          data = { result: error };
          success = false;

      }
      return NextResponse.json({ data, res, success });

    }else if(payload.action === "deleteSelectedChecks"){
      console.log("Delete Selected Checks")

      try {

        if((payload.selectedChecks).join('') === 'all') {
          console.log("ALL");

          try {

            const locationmaster_City = await Locationmaster_City.deleteMany();
            res = await locationmaster_City.find();
            console.log("Result Property: ", locationmaster_City);
            data = { result: "Data deleted successfully" };
  
        } catch (error) {
  
            console.error("Error:", error);
            data = { result: error };
            success = false;
  
        }
        return NextResponse.json({ data, res, success });

        }else{

          try {

            console.log("payload.selectedChecks: ",payload.selectedChecks)
            const locationmaster_City = await Locationmaster_City.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Locationmaster_City.find();
            console.log("Result Property: ", locationmaster_City);
            data = { result: "Data deleted successfully" };
            
        } catch (error) {
  
            console.error("Error:", error);
            data = { result: error };
            success = false;
  
        }
        return NextResponse.json({ data, res, success });




        }

        

    } catch (error) {

        console.error("Error:", error);
        data = { result: error };
        success = false;

    }
    return NextResponse.json({ data, res, success });

  }else if(payload.action === "editmany"){
console.log("Edit many",payload.ids,
payload.action,
payload.status)

if((payload.ids).join('') === 'all') {
  try {

    const locationmaster_City = await Locationmaster_City.updateMany( { } , {status : payload.status});
  
    res = await Locationmaster_City.find();
  
    console.log("Result Property: ", locationmaster_City);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const locationmaster_City = await Locationmaster_City.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Locationmaster_City.find();
  
    console.log("Result Property: ", locationmaster_City);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}






  }else {

      console.log("Add")
      try {

        let search = await Locationmaster_City.find({
          city: { $regex: new RegExp(payload.city, 'i') },
          city_desc: { $regex: new RegExp(payload.cityDesc, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {

          const locationmaster_City = await Locationmaster_City.create(payload);
          res = await Locationmaster_City.find();
          console.log("Result Property: ", locationmaster_City);
          data = { result: "Data inserted successfully" };
        }else {
          res = await Locationmaster_City.find();
          data = { result: "Data already existed" };
        }


    } catch (error) {

        console.error("Error:", error);
        data = { result: error };
        success = false;

    }
    return NextResponse.json({ data, res, success });





      
    }


}





