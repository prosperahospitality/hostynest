import  db  from "@/_lib/mongoDB";
import { Property_Type } from "@/_lib/model/property/property_type/property_type";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Property_Type.find();
    
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

          const property_type = await Property_Type.updateOne({ id: payload.id }, {property_category : payload.property_category,
            property_desc : payload.property_desc,
            status : payload.status});

          res = await Property_Type.find();

          console.log("Result Property: ", property_type);
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

          const property_type = await Property_Type.deleteOne({id : payload.id});
          res = await Property_Type.find();
          console.log("Result Property: ", property_type);
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

            const property_type = await Property_Type.deleteMany();
            res = await Property_Type.find();
            console.log("Result Property: ", property_type);
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
            const property_type = await Property_Type.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Property_Type.find();
            console.log("Result Property: ", property_type);
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

    const property_type = await Property_Type.updateMany( { } , {status : payload.status});
  
    res = await Property_Type.find();
  
    console.log("Result Property: ", property_type);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const property_type = await Property_Type.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Property_Type.find();
  
    console.log("Result Property: ", property_type);
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
        let search = await Property_Type.find({
          property_category: { $regex: new RegExp(payload.property_category, 'i') },
          property_desc: { $regex: new RegExp(payload.property_desc, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {
          const property_type = await Property_Type.create(payload);
          res = await Property_Type.find();
          console.log("Result Property: ", property_type);
          data = { result: "Data inserted successfully" };
        }else{
          res = await Property_Type.find();
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

