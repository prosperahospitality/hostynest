import  db  from "@/_lib/mongoDB";
import { Locationmaster_Alllocation } from "@/_lib/model/locationmaster/locationmaster_alllocation/locationmaster_alllocation";
import { Locationmaster_Region } from "@/_lib/model/locationmaster/locationmaster_region/locationmaster_region";
import { Locationmaster_Country } from "@/_lib/model/locationmaster/locationmaster_country/locationmaster_country";
import { Locationmaster_State } from "@/_lib/model/locationmaster/locationmaster_state/locationmaster_state";
import { Locationmaster_District } from "@/_lib/model/locationmaster/locationmaster_district/locationmaster_district";
import { Locationmaster_City } from "@/_lib/model/locationmaster/locationmaster_city/locationmaster_city";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let locationmaster_region =[];
let locationmaster_country =[];
let locationmaster_state =[];
let locationmaster_district =[];
let locationmaster_city =[];
let locationmaster_citypincode =[];
  let success=true;
  try {
    db.connect()
    data = await Locationmaster_Alllocation.find({status : "Active"});
    locationmaster_region  =await Locationmaster_Region.find({status : "Active"}).select("region -_id");
    locationmaster_country  = await Locationmaster_Country.find({status : "Active"}).select("country -_id");
    locationmaster_state = await Locationmaster_State.find({status : "Active"}).select("state -_id");
    locationmaster_district = await Locationmaster_District.find({status : "Active"}).select("district -_id");
    locationmaster_city = await Locationmaster_City.find({status : "Active"}).select("city city_pincode -_id");

  } catch (error) {
    data={result:error}
    success=false;
  }
  return NextResponse.json({data,locationmaster_region,
    locationmaster_country,
    locationmaster_state,
    locationmaster_district,
    locationmaster_city,success})
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

          const locationmaster_Alllocation = await Locationmaster_Alllocation.updateOne({ id: payload.id }, {region: payload.region,
            country: payload.country,
            state: payload.state,
            district: payload.district,
            city: payload.city,
            city_pincode: payload.city_pincode,
              status: payload.status});

          res = await Locationmaster_Alllocation.find();

          console.log("Result Property: ", locationmaster_Alllocation);
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

          const locationmaster_Alllocation = await Locationmaster_Alllocation.deleteOne({id : payload.id});
          res = await Locationmaster_Alllocation.find();
          console.log("Result Property: ", locationmaster_Alllocation);
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

            const locationmaster_Alllocation = await Locationmaster_Alllocation.deleteMany();
            res = await Locationmaster_Alllocation.find();
            console.log("Result Property: ", locationmaster_Alllocation);
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
            const locationmaster_Alllocation = await Locationmaster_Alllocation.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Locationmaster_Alllocation.find();
            console.log("Result Property: ", locationmaster_Alllocation);
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

    const locationmaster_Alllocation = await Locationmaster_Alllocation.updateMany( { } , {status : payload.status});
  
    res = await Locationmaster_Alllocation.find();
  
    console.log("Result Property: ", locationmaster_Alllocation);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const locationmaster_Alllocation = await Locationmaster_Alllocation.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Locationmaster_Alllocation.find();
  
    console.log("Result Property: ", locationmaster_Alllocation);
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

        let search = await Locationmaster_Alllocation.find({
          region: { $regex: new RegExp(payload.region, 'i') },
          city: { $regex: new RegExp(payload.city, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {

          const locationmaster_Alllocation = await Locationmaster_Alllocation.create(payload);
          res = await Locationmaster_Alllocation.find();
          console.log("Result Property: ", locationmaster_Alllocation);
          data = { result: "Data inserted successfully" };
        }else {
          res = await Locationmaster_Alllocation.find();
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





