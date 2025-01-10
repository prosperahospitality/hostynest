import  db  from "@/_lib/mongoDB";
import { Property_Bedtype } from "@/_lib/model/property/property_bedtype/property_bedtype";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Property_Bedtype.find();
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

          const property_bedtype = await Property_Bedtype.updateOne({ id: payload.id }, {property_bedtype : payload.property_bedtype,
            propertybedtype_desc : payload.propertybedtype_desc,
            status : payload.status});

          res = await Property_Bedtype.find();

          console.log("Result Property: ", property_bedtype);
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

          const property_bedtype = await Property_Bedtype.deleteOne({id : payload.id});
          res = await Property_Bedtype.find();
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

            const property_bedtype = await Property_Bedtype.deleteMany();
            res = await Property_Bedtype.find();
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
            const property_Bedtype = await Property_Bedtype.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Property_Bedtype.find();
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

    const property_Bedtype = await Property_Bedtype.updateMany( { } , {status : payload.status});
  
    res = await Property_Bedtype.find();
  
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

    const property_Bedtype = await Property_Bedtype.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Property_Bedtype.find();
  
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

        let search = await Property_Bedtype.find({
          property_bedtype: { $regex: new RegExp(payload.property_bedtype, 'i') },
          propertybedtype_desc: { $regex: new RegExp(payload.propertybedtype_desc, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {
          res = await Property_Bedtype.find();
          payload.serial_id = res.length + 1;
          const property_bedtype = await Property_Bedtype.create(payload);
          res = await Property_Bedtype.find();
          console.log("Result Property: ", property_bedtype);
          data = { result: "Data inserted successfully" };
        }else {
          res = await Property_Bedtype.find();
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

