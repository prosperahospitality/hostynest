import  db  from "@/_lib/mongoDB";
import { Amenities } from "@/_lib/model/property/amenities/amenities";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Amenities.find();
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

          const amenities = await Amenities.updateOne({ id: payload.id }, {amenities : payload.amenities,
            amenities_desc : payload.amenities_desc,
            value : payload.value,
            status : payload.status});

          res = await Amenities.find();

          console.log("Result Property: ", amenities);
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

          const amenities = await Amenities.deleteOne({id : payload.id});
          res = await Amenities.find();
          console.log("Result Property: ", amenities);
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

            const amenities = await Amenities.deleteMany();
            res = await Amenities.find();
            console.log("Result Property: ", amenities);
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
            const amenities = await Amenities.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Amenities.find();
            console.log("Result Property: ", amenities);
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

    const amenities = await Amenities.updateMany( { } , {status : payload.status});
  
    res = await Amenities.find();
  
    console.log("Result Property: ", amenities);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const amenities = await Amenities.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Amenities.find();
  
    console.log("Result Property: ", amenities);
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

        let search = await Amenities.find({
          amenities: { $regex: new RegExp(payload.amenities, 'i') },
          amenities_desc: { $regex: new RegExp(payload.amenities_desc, 'i') },
          value: { $regex: new RegExp(payload.value, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {
          const amenities = await Amenities.create(payload);
          res = await Amenities.find();
          console.log("Result Property: ", amenities);
          data = { result: "Data inserted successfully" };
        }else {
          res = await Amenities.find();
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

