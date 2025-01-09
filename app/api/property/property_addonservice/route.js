import  db  from "@/_lib/mongoDB";
import { Property_Addonservice } from "@/_lib/model/property/property_addonservice/property_addonservice";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Property_Addonservice.find();
    console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
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

          const property_addonservice = await Property_Addonservice.updateOne({ id: payload.id }, {property_addonservice : payload.property_addonservice,
            propertyaddonservice_desc : payload.propertyaddonservice_desc,
            propertyaddonservice_type : payload.propertyaddonservice_type,
            status : payload.status});

          res = await Property_Addonservice.find();

          console.log("Result Property: ", property_addonservice);
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

          const property_addonservice = await Property_Addonservice.deleteOne({id : payload.id});
          res = await Property_Addonservice.find();
          console.log("Result Property: ", property_addonservice);
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

            const property_Addonservice = await Property_Addonservice.deleteMany();
            res = await Property_Addonservice.find();
            console.log("Result Property: ", property_Addonservice);
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
            const property_Addonservice = await Property_Addonservice.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Property_Addonservice.find();
            console.log("Result Property: ", property_Addonservice);
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
payload.action,payload.propertyaosType,
payload.status)

if((payload.ids).join('') === 'all') {
  try {

    const property_Addonservice = await Property_Addonservice.updateMany( { } , {propertyaddonservice_type: payload.propertyaosType, status : payload.status});
  
    res = await Property_Addonservice.find();
  
    console.log("Result Property: ", property_Addonservice);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const property_Addonservice = await Property_Addonservice.updateMany({ id: { $in: payload.ids } }, {propertyaddonservice_type: payload.propertyaosType, status : payload.status});
  
    res = await Property_Addonservice.find();
  
    console.log("Result Property: ", property_Addonservice);
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

        let search = await Property_Addonservice.find({
          property_addonservice: { $regex: new RegExp(payload.property_addonservice, 'i') },
          propertyaddonservice_desc: { $regex: new RegExp(payload.propertyaddonservice_desc, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {
          const property_addonservice = await Property_Addonservice.create(payload);
          res = await Property_Addonservice.find();
          console.log("Result Property: ", property_addonservice);
          data = { result: "Data inserted successfully" };
        }else {
          res = await Property_Addonservice.find();
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

