import  db  from "@/_lib/mongoDB";
import { Property_Extbedtype } from "@/_lib/model/property/property_extbedtype/property_extbedtype";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Property_Extbedtype.find();
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

          const property_extbedtype = await Property_Extbedtype.updateOne({ id: payload.id }, {property_extbedtype : payload.property_extbedtype,
            propertyextbedtype_desc : payload.propertyextbedtype_desc,
            status : payload.status});

          res = await Property_Extbedtype.find();

          console.log("Result Property: ", property_extbedtype);
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

          const property_extbedtype = await Property_Extbedtype.deleteOne({id : payload.id});
          res = await Property_Extbedtype.find();
          console.log("Result Property: ", property_extbedtype);
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

            const property_Extbedtype = await Property_Extbedtype.deleteMany();
            res = await Property_Extbedtype.find();
            console.log("Result Property: ", property_Extbedtype);
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
            const property_Extbedtype = await Property_Extbedtype.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Property_Extbedtype.find();
            console.log("Result Property: ", property_Extbedtype);
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

    const property_Extbedtype = await Property_Extbedtype.updateMany( { } , {status : payload.status});
  
    res = await Property_Extbedtype.find();
  
    console.log("Result Property: ", property_Extbedtype);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const property_Extbedtype = await Property_Extbedtype.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Property_Extbedtype.find();
  
    console.log("Result Property: ", property_Extbedtype);
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

        let search = await Property_Extbedtype.find({
          property_extbedtype: { $regex: new RegExp(payload.property_extbedtype, 'i') },
          propertyextbedtype_desc: { $regex: new RegExp(payload.propertyextbedtype_desc, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {
          res = await Property_Extbedtype.find();
          payload.serial_id = res.length + 1;
          const property_extbedtype = await Property_Extbedtype.create(payload);
          res = await Property_Extbedtype.find();
          console.log("Result Property: ", property_extbedtype);
          data = { result: "Data inserted successfully" };
        }else {
          res = await Property_Extbedtype.find();
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

