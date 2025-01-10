import  db  from "@/_lib/mongoDB";
import { User } from "@/_lib/model/user";
import { NextResponse } from "next/server";


export async function GET(req){
  let user_Id = req.nextUrl.searchParams.get('userID');
  //console.log("UserID:::::::>",user_Id)
  let data = [];
  let data_by_id = [];
  let success=true;
  try {
    db.connect()
    
    if(user_Id) {
      data_by_id = await User.findOne({user_id : user_Id});
    }else{
      data = await User.find();
    }
    
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({result:data,data_by_id,success})
}


export async function POST(request){
  const payload = await request.json();
  console.log("Payload::::::::>",payload);
  db.connect();

  if(payload.operation === "update") {
    //const user = new User(payload);

    const ress = await User.updateOne({ user_id: payload.user_id, mobile_number: payload.mobile_number }, {hashPassword: payload.password});

    return NextResponse.json({ress,success:true})
  }else if(payload.operation === "updateDeleteFlag") {
    console.log("Payload1::::::::>",payload.user_id, payload.mobile_number);
    //const user = new User(payload);

    const ress = await User.updateOne({ user_id: payload.user_id, mobile_number: payload.mobile_number }, {delete_flag: 1});

    return NextResponse.json({ress,success:true})
  }else if(payload.operation === "updatePropCode") {
    console.log("Payload1::::::::>",payload.userID);
    //const user = new User(payload);


    const user = await User.findOne({user_id: payload.userID });

    if(user.favourites.includes(payload.propCode)){

        console.log("True");

        let result = "Already added to favourite"

        let data_by_id = await User.findOne({user_id : payload.userID});

        return NextResponse.json({result, data_by_id,success:true})

    }else{
        console.log("False");

        user.favourites.push(payload.propCode);

        const result = await user.save();
    
        let data_by_id = await User.findOne({user_id : payload.userID});

        return NextResponse.json({data_by_id,success:true})

    }


    
    //const ress = await User.updateOne({ user_id: payload.userID, user_role: payload.user_role  }, {$push: { favourite: payload.propCode }});

  }else{
    const user = new User(payload);
    const result = await user.save();
    return NextResponse.json({result,success:true})
  }

}



