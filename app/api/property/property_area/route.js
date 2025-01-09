import  db  from "@/_lib/mongoDB";
import { Property_Area } from "@/_lib/model/property/property_area/property_area";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Property_Area.find();
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

          const property_area = await Property_Area.updateOne({ id: payload.id }, {property_area : payload.property_area,
            propertyarea_desc : payload.propertyarea_desc,
            status : payload.status});

          res = await Property_Area.find();

          console.log("Result Property: ", property_area);
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

          const property_area = await Property_Area.deleteOne({id : payload.id});
          res = await Property_Area.find();
          console.log("Result Property: ", property_area);
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

            const property_Area = await Property_Area.deleteMany();
            res = await Property_Area.find();
            console.log("Result Property: ", property_Area);
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
            const property_Area = await Property_Area.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Property_Area.find();
            console.log("Result Property: ", property_Area);
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

    const property_Area = await Property_Area.updateMany( { } , {status : payload.status});
  
    res = await Property_Area.find();
  
    console.log("Result Property: ", property_Area);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const property_Area = await Property_Area.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Property_Area.find();
  
    console.log("Result Property: ", property_Area);
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

        let search = await Property_Area.find({
          property_area: { $regex: new RegExp(payload.property_area, 'i') },
          propertyarea_desc: { $regex: new RegExp(payload.propertyarea_desc, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {
          res = await Property_Area.find();
          payload.serial_id = res.length + 1;
          const property_area = await Property_Area.create(payload);
          res = await Property_Area.find();
          console.log("Result Property: ", property_area);
          data = { result: "Data inserted successfully" };
        }else {
          res = await Property_Area.find();
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

