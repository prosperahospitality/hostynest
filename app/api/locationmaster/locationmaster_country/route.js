import  db  from "@/_lib/mongoDB";
import { Locationmaster_Country } from "@/_lib/model/locationmaster/locationmaster_country/locationmaster_country";
import { NextResponse } from "next/server";

export async function GET(){
  let data = [];
  let success=true;
  try {
    db.connect()
    data = await Locationmaster_Country.find();
  } catch (error) {
    data={result:error}
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

          const locationmaster_Country = await Locationmaster_Country.updateOne({ id: payload.id }, {country : payload.country,
            country_desc : payload.countryDesc,
            status : payload.status});

          res = await Locationmaster_Country.find();

          console.log("Result Property: ", locationmaster_Country);
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

          const locationmaster_Country = await Locationmaster_Country.deleteOne({id : payload.id});
          res = await Locationmaster_Country.find();
          console.log("Result Property: ", locationmaster_Country);
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

            const locationmaster_Country = await Locationmaster_Country.deleteMany();
            res = await locationmaster_Country.find();
            console.log("Result Property: ", locationmaster_Country);
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
            const locationmaster_Country = await Locationmaster_Country.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Locationmaster_Country.find();
            console.log("Result Property: ", locationmaster_Country);
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

    const locationmaster_Country = await Locationmaster_Country.updateMany( { } , {status : payload.status});
  
    res = await Locationmaster_Country.find();
  
    console.log("Result Property: ", locationmaster_Country);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const locationmaster_Country = await Locationmaster_Country.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Locationmaster_Country.find();
  
    console.log("Result Property: ", locationmaster_Country);
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

        let search = await Locationmaster_Country.find({
          country: { $regex: new RegExp(payload.country, 'i') },
          country_desc: { $regex: new RegExp(payload.countryDesc, 'i') }
      });

        console.log("Search: ",search);
        
        if(search.length === 0) {

          const locationmaster_Country = await Locationmaster_Country.create(payload);
          res = await Locationmaster_Country.find();
          console.log("Result Property: ", locationmaster_Country);
          data = { result: "Data inserted successfully" };
        }else {
          res = await Locationmaster_Country.find();
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





