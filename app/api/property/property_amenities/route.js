import  db  from "@/_lib/mongoDB";
import { Property_Amenities } from "@/_lib/model/property/property_amenities/property_amenities";
import { Property_Area } from "@/_lib/model/property/property_area/property_area";
import { Amenities } from "@/_lib/model/property/amenities/amenities";
import { Pms_Propertymaster_Roomamenities } from "@/_lib/model/pms/property_master/room_amenities/room_amenities";
import { NextResponse } from "next/server";

export async function GET(request){
  let hotelId = request.nextUrl.searchParams.get('hotelId');
  let data = [];
   let property_area = [];
   let amenities = [];
   let pms_propertymaster_roomamenities = [];
  let success=true;
  try {
    db.connect()
    data = await Property_Amenities.find({status: "Active"});
    property_area = await Property_Area.find({status: "Active"}).select("id property_area -_id");
    amenities = await Amenities.find({status: "Active"}).select("id amenities value -_id");
    pms_propertymaster_roomamenities = await Pms_Propertymaster_Roomamenities.find({Hotel_Id : hotelId});
    //console.log("rEs::::>",data);
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,property_area,
    amenities, pms_propertymaster_roomamenities, success})
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

          const property_amenities = await Property_Amenities.updateOne({ id: payload.id }, {amenities_id : payload.amenities_id,
            property_amenities: payload.property_amenities,
            amenities_value : payload.amenities_value,
            propertyarea_id: payload.propertyarea_id,
            property_area : payload.property_area,
            status: payload.status});

          res = await Property_Amenities.find();

          console.log("Result Property: ", property_amenities);
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

          const property_amenities = await Property_Amenities.deleteOne({id : payload.id});
          res = await Property_Amenities.find();
          console.log("Result Property: ", property_amenities);
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

            const property_Amenities = await Property_Amenities.deleteMany();
            res = await Property_Amenities.find();
            console.log("Result Property: ", property_Amenities);
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
            const property_Amenities = await Property_Amenities.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Property_Amenities.find();
            console.log("Result Property: ", property_Amenities);
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

    const property_Amenities = await Property_Amenities.updateMany( { } , {status : payload.status});
  
    res = await Property_Amenities.find();
  
    console.log("Result Property: ", property_Amenities);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const property_Amenities = await Property_Amenities.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Property_Amenities.find();
  
    console.log("Result Property: ", property_Amenities);
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

        console.log("ID::::::::>",payload.id,payload.property_area,payload.property_amenities)

      let search = await Property_Amenities.find({
        property_area: { $regex: new RegExp(payload.property_area, 'i') },
        property_amenities: { $regex: new RegExp(payload.property_amenities, 'i') }
    });

        //console.log("Search: ",search);
        
        if(search.length === 0) {
          const property_amenities = await Property_Amenities.create(payload);
          res = await Property_Amenities.find();
          console.log("Result Property: ", property_amenities);
          data = { result: "Data inserted successfully" };
        }else {
          res = await Property_Amenities.find();
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

