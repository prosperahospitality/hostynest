import  db  from "@/_lib/mongoDB";
import { FandS_Categorys } from "@/_lib/model/fands/fands_categorys/fands_categorys";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await FandS_Categorys.find();
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

          const fands_categorys = await FandS_Categorys.updateOne({ id: payload.id }, {fands_category: payload.fands_category,
            fandscategory_desc: payload.fandscategory_desc,
            status: payload.status});

          res = await FandS_Categorys.find();

          console.log("Result Property: ", fands_categorys);
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

          const fands_categorys = await FandS_Categorys.deleteOne({id : payload.id});
          res = await FandS_Categorys.find();
          console.log("Result Property: ", fands_categorys);
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

            const fandS_Categorys = await FandS_Categorys.deleteMany();
            res = await FandS_Categorys.find();
            console.log("Result Property: ", fandS_Categorys);
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
            const fandS_Categorys = await FandS_Categorys.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await FandS_Categorys.find();
            console.log("Result Property: ", fandS_Categorys);
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

    const fandS_Categorys = await FandS_Categorys.updateMany( { } , {status : payload.status});
  
    res = await FandS_Categorys.find();
  
    console.log("Result Property: ", fandS_Categorys);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const fandS_Categorys = await FandS_Categorys.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await FandS_Categorys.find();
  
    console.log("Result Property: ", fandS_Categorys);
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

        let search = await FandS_Categorys.find({
          fands_category: { $regex: new RegExp(payload.fands_category, 'i') },
          fandscategory_desc: { $regex: new RegExp(payload.fandscategory_desc, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {
          const fands_categorys = await FandS_Categorys.create(payload);
          res = await FandS_Categorys.find();
          console.log("Result Property: ", fands_categorys);
          data = { result: "Data inserted successfully" };
        }else {
          res = await FandS_Categorys.find();
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

