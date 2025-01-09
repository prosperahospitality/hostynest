import  db  from "@/_lib/mongoDB";
import { Property_Roomtype } from "@/_lib/model/property/property_roomtype/property_roomtype";
import { Property_Type } from "@/_lib/model/property/property_type/property_type";
import { Property_Bedtype } from "@/_lib/model/property/property_bedtype/property_bedtype";
import { Property_Extbedtype } from "@/_lib/model/property/property_extbedtype/property_extbedtype";
import { Property_Roomview } from "@/_lib/model/property/property_roomview/property_roomview";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let property_type = [];
  let property_bedtype = [];
  let property_extbedtype = [];
  let property_roomview = [];

  let success=true;

  try {
    db.connect()

    data = await Property_Roomtype.find();

    property_type = await Property_Type.find({status : "Active"}).select("property_category -_id");

    property_bedtype = await Property_Bedtype.find({status : "Active"}).select("property_bedtype -_id");
    
    property_extbedtype = await Property_Extbedtype.find({status : "Active"}).select("property_extbedtype -_id");
    
    property_roomview = await Property_Roomview.find({status : "Active"}).select("property_roomview -_id");


  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data, property_type,
    property_bedtype,
    property_extbedtype,
    property_roomview, success})
}

export async function POST(req){
    const payload = await req.json();
    console.log("Payload: ", payload);
    let data = [];
    let res = [];
    let success = true;
    await db.connect();

    if(payload.action === "edit") {

        console.log("Edit")
        try {
          console.log("Payload ID: ",payload.id)
          const property_roomtype = await Property_Roomtype.updateOne({ id: payload.id }, {property_name : payload.property_name,
            property_type : payload.property_type,
            property_bedtype : payload.property_bedtype,
            property_extbedtype : payload.property_extbedtype,
            property_roomview : payload.property_roomview,
            property_rateplan : payload.property_rateplan,
            status: payload.status});

          res = await Property_Roomtype.find();

          console.log("Result Property: ", property_roomtype);
          data = { result: "Data updated successfully" };

      } catch (error) {

          console.error("Error:", error);
          data = { result: error };
          success = false;
          
      }
      return NextResponse.json({ data, res, success });


    }else if(payload.action === "delete") {

        console.log("Delete")
        try {

          const property_roomtype = await Property_Roomtype.deleteOne({id : payload.id});
          res = await Property_Roomtype.find();
          console.log("Result Property: ", property_roomtype);
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

            const property_Roomtype = await Property_Roomtype.deleteMany();
            res = await Property_Roomtype.find();
            console.log("Result Property: ", property_Roomtype);
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
            const property_Roomtype = await Property_Roomtype.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Property_Roomtype.find();
            console.log("Result Property: ", property_Roomtype);
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

    const property_Roomtype = await Property_Roomtype.updateMany( { } , {status : payload.status});
  
    res = await Property_Roomtype.find();
  
    console.log("Result Property: ", property_Roomtype);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const property_Roomtype = await Property_Roomtype.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Property_Roomtype.find();
  
    console.log("Result Property: ", property_Roomtype);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}






  }else{
      console.log("Add")

      try {

      //   let search = await Property_Roomtype.find({
      //     property_name: { $regex: new RegExp(payload.property_name, 'i') },
      // });

      //   console.log("Search: ",search);
        
      //   if(search.length === 0) {

          const property_roomtype= await Property_Roomtype.create(payload);
          res = await Property_Roomtype.find();
          console.log("Result Property: ", property_roomtype);
          data = { result: "Data inserted successfully" };

        // }else {
        //   res = await Property_Roomtype.find();
        //   data = { result: "Data already existed" };
        // }


    } catch (error) {

        console.error("Error:", error);
        data = { result: error };
        success = false;

    }
    return NextResponse.json({ data, res, success });
    }



   
    return NextResponse.json({ data, res, success });

}

