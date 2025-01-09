import  db  from "@/_lib/mongoDB";
import { Locationmaster_Region } from "@/_lib/model/locationmaster/locationmaster_region/locationmaster_region";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Locationmaster_Region.find();
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

          const locationmaster_Region = await Locationmaster_Region.updateOne({ id: payload.id }, {region : payload.region,
            region_desc : payload.regionDesc,
            status : payload.status});

          res = await Locationmaster_Region.find();

          console.log("Result Property: ", locationmaster_Region);
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

          const locationmaster_Region = await Locationmaster_Region.deleteOne({id : payload.id});
          res = await Locationmaster_Region.find();
          console.log("Result Property: ", locationmaster_Region);
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

            const locationmaster_Region = await Locationmaster_Region.deleteMany();
            res = await Locationmaster_Region.find();
            console.log("Result Property: ", locationmaster_Region);
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
            const locationmaster_Region = await Locationmaster_Region.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Locationmaster_Region.find();
            console.log("Result Property: ", locationmaster_Region);
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

    const locationmaster_Region = await Locationmaster_Region.updateMany( { } , {status : payload.status});
  
    res = await Locationmaster_Region.find();
  
    console.log("Result Property: ", locationmaster_Region);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const locationmaster_Region = await Locationmaster_Region.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Locationmaster_Region.find();
  
    console.log("Result Property: ", locationmaster_Region);
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

        let search = await Locationmaster_Region.find({
          region: { $regex: new RegExp(payload.region, 'i') },
          region_desc: { $regex: new RegExp(payload.regionDesc, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {

          const locationmaster_Region = await Locationmaster_Region.create(payload);
          res = await Locationmaster_Region.find();
          console.log("Result Property: ", locationmaster_Region);
          data = { result: "Data inserted successfully" };
        }else {
          res = await Locationmaster_Region.find();
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





