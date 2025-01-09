import  db  from "@/_lib/mongoDB";
import { FandS_Combs } from "@/_lib/model/fands/fands_combs/fands_combs";
import { FandS_Categorys } from "@/_lib/model/fands/fands_categorys/fands_categorys";
import { FandS_Items } from "@/_lib/model/fands/fands_items/fands_items";
import { Pms_Propertymaster_Roomfands } from "@/_lib/model/pms/property_master/room_fands/room_fands";
import { NextResponse } from "next/server";

export async function GET(req){
  let hotelId = req.nextUrl.searchParams.get('hotelId');
  let data = [];
  let data_active = [];
  let success=true;
  let fands_categorys = [];
  let pms_propertymaster_roomfands = [];
  let fands_items = [];
  try {
    db.connect()
    data = await FandS_Combs.find();
    data_active = await FandS_Combs.find({status : "Active"});
    fands_categorys = await FandS_Categorys.find({status : "Active"}).select("id fands_category -_id")
    fands_items = await FandS_Items.find({status : "Active"}).select("id fands_item -_id")
    pms_propertymaster_roomfands = await Pms_Propertymaster_Roomfands.find({Hotel_Id : hotelId})
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data,fands_categorys,
    fands_items, data_active, pms_propertymaster_roomfands, success})
}

export async function POST(req){
    const payload = await req.json();
    console.log("Payload: ", payload);
    let data = [];
    let res = [];
    let success = true;
    await db.connect();

    if(payload.action === "edit"){

      console.log("Edit",payload)

      try {
        let search;
        let test = await FandS_Combs.findOne({ id : payload.id});

        console.log("Test: ",test)

        if(test.status === payload.status) {
            search = await FandS_Combs.find({
                fands_category: { $regex: new RegExp(payload.fands_category, 'i') },
                fands_item: { $regex: new RegExp(payload.fands_item, 'i') },
            });
        }else{

        search = await FandS_Combs.find({
          fands_category: { $regex: new RegExp(payload.fands_category, 'i') },
          fands_item: { $regex: new RegExp(payload.fands_item, 'i') },
          status: { $regex: new RegExp(payload.status, 'i') }
      });
    }

      console.log("Search: ",search)

      if(search.length === 0) {
        const fands_combs = await FandS_Combs.updateOne({ id: payload.id }, {fands_categoryid : payload.fands_categoryid,
          fands_category: payload.fands_category,
          fands_itemid : payload.fands_itemid,
          fands_item: payload.fands_item,
          status: payload.status});

        res = await FandS_Combs.find();

        console.log("Result Property: ", fands_combs);
        data = { result: "Data updated successfully" };
      }else{
        res = await FandS_Combs.find();
        data = { result: "Data already existed" };
      }
          

      } catch (error) {

          console.error("Error:", error);
          data = { result: error };
          success = false;
          
      }
      return NextResponse.json({ data, res, success });

    }else if(payload.action === "delete"){
      console.log("Delete")
      try {

          const fands_combs = await FandS_Combs.deleteOne({id : payload.id});
          res = await FandS_Combs.find();
          console.log("Result Property: ", fands_combs);
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

            const fandS_Combs = await FandS_Combs.deleteMany();
            res = await FandS_Combs.find();
            console.log("Result Property: ", fandS_Combs);
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
            const fandS_Combs = await FandS_Combs.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await FandS_Combs.find();
            console.log("Result Property: ", fandS_Combs);
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

    const fandS_Combs = await FandS_Combs.updateMany( { } , {status : payload.status});
  
    res = await FandS_Combs.find();
  
    console.log("Result Property: ", fandS_Combs);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const fandS_Combs = await FandS_Combs.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await FandS_Combs.find();
  
    console.log("Result Property: ", fandS_Combs);
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

        let search = await FandS_Combs.find({
          fands_category: { $regex: new RegExp(payload.fands_category, 'i') },
          fands_item: { $regex: new RegExp(payload.fands_item, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {
          const fands_combs = await FandS_Combs.create(payload);
          res = await FandS_Combs.find();
          console.log("Result Property: ", fands_combs);
          data = { result: "Data inserted successfully" };
        }else {
          res = await FandS_Combs.find();
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

