import  db  from "@/_lib/mongoDB";
import { NextResponse } from "next/server";
import { Image_Tag } from "@/_lib/model/property/image_tag/image_tag";

export async function GET(){
  let data = [];
  let dataActivee = [];
  let success=true;
  try {
    db.connect()
    data = await Image_Tag.find();
    dataActivee = await Image_Tag.find({status: "Active"});
   // console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data, dataActivee,success})
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

          const property_area = await Image_Tag.updateOne({ id: payload.id }, {tag_name : payload.tag_name,
            tag_desc : payload.tag_desc,
            status : payload.status});

          res = await Image_Tag.find();

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

          const property_area = await Image_Tag.deleteOne({id : payload.id});
          res = await Image_Tag.find();
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

            const property_Area = await Image_Tag.deleteMany();
            res = await Image_Tag.find();
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
            const property_Area = await Image_Tag.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Image_Tag.find();
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

    const property_Area = await Image_Tag.updateMany( { } , {status : payload.status});
  
    res = await Image_Tag.find();
  
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

    const property_Area = await Image_Tag.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Image_Tag.find();
  
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

        let search = await Image_Tag.find({
          tag_name: { $regex: new RegExp(payload.tag_name, 'i') },
          tag_desc: { $regex: new RegExp(payload.tag_desc, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {
          res = await Image_Tag.find();
          payload.serial_id = res.length + 1;
          const property_area = await Image_Tag.create(payload);
          res = await Image_Tag.find();
          console.log("Result Property: ", property_area);
          data = { result: "Data inserted successfully" };
        }else {
          res = await Image_Tag.find();
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

