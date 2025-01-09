import  db  from "@/_lib/mongoDB";
import { FandS_Items } from "@/_lib/model/fands/fands_items/fands_items";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await FandS_Items.find();
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

          const fands_items = await FandS_Items.updateOne({ id: payload.id }, {fands_item: payload.fands_item,
            fandsitem_desc: payload.fandsitem_desc,
            status: payload.status});

          res = await FandS_Items.find();

          console.log("Result Property: ", fands_items);
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

          const fands_items = await FandS_Items.deleteOne({id : payload.id});
          res = await FandS_Items.find();
          console.log("Result Property: ", fands_items);
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

            const fandS_Items = await FandS_Items.deleteMany();
            res = await FandS_Items.find();
            console.log("Result Property: ", fandS_Items);
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
            const fandS_Items = await FandS_Items.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await FandS_Items.find();
            console.log("Result Property: ", fandS_Items);
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

    const fandS_Items = await FandS_Items.updateMany( { } , {status : payload.status});
  
    res = await FandS_Items.find();
  
    console.log("Result Property: ", fandS_Items);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const fandS_Items = await FandS_Items.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await FandS_Items.find();
  
    console.log("Result Property: ", fandS_Items);
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

        let search = await FandS_Items.find({
          fands_item: { $regex: new RegExp(payload.fands_item, 'i') },
          fandsitem_desc: { $regex: new RegExp(payload.fandsitem_desc, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {
          const fands_items = await FandS_Items.create(payload);
          res = await FandS_Items.find();
          console.log("Result Property: ", fands_items);
          data = { result: "Data inserted successfully" };
        }else {
          res = await FandS_Items.find();
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

