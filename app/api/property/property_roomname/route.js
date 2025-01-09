import  db  from "@/_lib/mongoDB";
import { Property_Roomname } from "@/_lib/model/property/property_roomname/property_roomname";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Property_Roomname.find();
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

          const property_roomname = await Property_Roomname.updateOne({ id: payload.id }, {property_roomname : payload.property_roomname,
            property_roomname_desc : payload.property_roomname_desc,
            status : payload.status});

          res = await Property_Roomname.find();

          console.log("Result Property: ", property_roomname);
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

          const property_bedtype = await Property_Roomname.deleteOne({id : payload.id});
          res = await Property_Roomname.find();
          console.log("Result Property: ", property_bedtype);
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

            const property_bedtype = await Property_Roomname.deleteMany();
            res = await Property_Roomname.find();
            console.log("Result Property: ", property_bedtype);
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
            const property_Bedtype = await Property_Roomname.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Property_Roomname.find();
            console.log("Result Property: ", property_Bedtype);
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

    const property_Bedtype = await Property_Roomname.updateMany( { } , {status : payload.status});
  
    res = await Property_Roomname.find();
  
    console.log("Result Property: ", property_Bedtype);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const property_Bedtype = await Property_Roomname.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Property_Roomname.find();
  
    console.log("Result Property: ", property_Bedtype);
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

        let search = await Property_Roomname.find({
            property_roomname: { $regex: new RegExp(payload.property_roomname, 'i') },
            property_roomname_desc: { $regex: new RegExp(payload.property_roomname_desc, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {
          res = await Property_Roomname.find();
          payload.serial_id = res.length + 1;
          const property_bedtype = await Property_Roomname.create(payload);
          res = await Property_Roomname.find();
          console.log("Result Property: ", property_bedtype);
          data = { result: "Data inserted successfully" };
        }else {
          res = await Property_Roomname.find();
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

