import  db  from "@/_lib/mongoDB";
import { Hotel_Infos } from "@/_lib/model/hotels/hotel_info/hotel_info";
import { Property_Floor } from "@/_lib/model/property/property_floor/property_floor";
import { Property_Roomtype } from "@/_lib/model/property/property_roomtype/property_roomtype";
import { Property_Bedtype } from "@/_lib/model/property/property_bedtype/property_bedtype";
import { Pms_Propertymaster_Roomdetails } from "@/_lib/model/pms/property_master/room_details/room_details";
import { NextResponse } from "next/server";

export async function GET(request){

  let hotelId = request.nextUrl.searchParams.get('hotelId');
  let type = request.nextUrl.searchParams.get('type');

  let data = [];
  let dataAll = [];
  let dataAllActive = [];
  let floor = [];
  let roomtype = [];
  let bedtype = [];
  let hotel_info = {};
  let dataActive = [];
  let success=true;
  try {
    db.connect()

    if(type === "room") {

      data = await Pms_Propertymaster_Roomdetails.find({"Hotel_Id": parseInt(hotelId)});
      return NextResponse.json({ data, success })

    }else {

      data = await Pms_Propertymaster_Roomdetails.find({"Hotel_Id": parseInt(hotelId)});
      hotel_info = await Hotel_Infos.findOne({"Hotel_Id": hotelId}).select("id Hotel_Type -_id");
      dataAll = await Pms_Propertymaster_Roomdetails.find();
      dataAllActive = await Pms_Propertymaster_Roomdetails.find({"status" : "Active"});
      dataActive = await Pms_Propertymaster_Roomdetails.find({"Hotel_Id": hotelId, "status" : "Active"});
      floor = await Property_Floor.find().select("property_floor -_id");
      // roomtype = await Property_Roomtype.find({property_type: {$regex: new RegExp(hotel_info.Hotel_Type, 'i')}}).select("property_name property_roomview -_id");
      roomtype = await Property_Roomtype.find().select("-_id");
      bedtype = await Property_Bedtype.find({"status" : "Active"})
      return NextResponse.json({data, dataAll,floor,
        roomtype, hotel_info, dataActive, bedtype, dataAllActive, success})
        
    }

  } catch (error) {
    data = { result:"error" }
    success = false;
  }
  
}

export async function POST(req){
    const payload = await req.json();
    console.log("Payload: ", payload);
    let data = [];
    let dataAll = [];
    let res = [];
    let success = true;
    await db.connect();

    if(payload.action === "edit"){

      console.log("Edit")

      try {

          const pms_propertymaster_roomdetails = await Pms_Propertymaster_Roomdetails.updateOne({ id: payload.id }, {room_no: payload.room_no,
            room_name: payload.room_name,
            room_type: payload.room_type,
            room_rate: payload.room_rate,
            cgst: payload.cgst,
            sgst: payload.sgst,
            igst: payload.igst,
            extra_adult_price: payload.extra_adult_price,
            extra_child_price: payload.extra_child_price,
            room_size: payload.room_size,
            room_size_type: payload.room_size_type,
            status: payload.status,
            base_adult: payload.base_adult,
            base_child: payload.base_child,
            max_adult: payload.max_adult,
            max_child: payload.max_child,
            max_infant: payload.max_infant,
            max_guest: payload.max_guest,
            bed_type: payload.bed_type,
            number_of_beds: payload.number_of_beds,
            bed_size: payload.bed_size,
          });

          res = await Pms_Propertymaster_Roomdetails.find({"Hotel_Id": payload.Hotel_Id});

          console.log("Result Property: ", pms_propertymaster_roomdetails);
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

          const pms_propertymaster_roomdetails = await Pms_Propertymaster_Roomdetails.deleteOne({id : payload.id});
          res = await Pms_Propertymaster_Roomdetails.find({"Hotel_Id": payload.Hotel_Id});
          console.log("Result Property: ", pms_propertymaster_roomdetails);
          data = { result: "Data deleted successfully" };

      } catch (error) {

          console.error("Error:", error);
          data = { result: error };
          success = false;

      }
      return NextResponse.json({ data, res, success });

    }
else if(payload.action === "deleteSelectedChecks"){
      console.log("Delete Selected Checks")

      try {

        if((payload.selectedChecks).join('') === 'all') {
          console.log("ALL");

          try {

            const pms_propertymaster_roomdetails = await Pms_Propertymaster_Roomdetails.deleteMany();
            res = await Pms_Propertymaster_Roomdetails.find({"Hotel_Id": payload.Hotel_Id});
            dataAll = await Pms_Propertymaster_Roomdetails.find();
            console.log("Result Property: ", pms_propertymaster_roomdetails);
            data = { result: "Data deleted successfully" };
  
        } catch (error) {
  
            console.error("Error:", error);
            data = { result: error };
            success = false;
  
        }
        return NextResponse.json({ data, dataAll, res, success });

        }else{

          try {

            console.log("payload.selectedChecks: ",payload.selectedChecks)
            const pms_propertymaster_roomdetails = await Pms_Propertymaster_Roomdetails.deleteMany({ id: { $in: payload.selectedChecks } });
            res = await Pms_Propertymaster_Roomdetails.find({"Hotel_Id": payload.Hotel_Id});
            dataAll = await Pms_Propertymaster_Roomdetails.find();
            console.log("Result Property: ", pms_propertymaster_roomdetails);
            data = { result: "Data deleted successfully" };
            
        } catch (error) {
  
            console.error("Error:", error);
            data = { result: error };
            success = false;
  
        }
        return NextResponse.json({ data, dataAll, res, success });




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

    const pms_propertymaster_roomdetails = await Pms_Propertymaster_Roomdetails.updateMany( { } , {status : payload.status});
  
    res = await Pms_Propertymaster_Roomdetails.find({"Hotel_Id": payload.Hotel_Id});
  
    console.log("Result Property: ", pms_propertymaster_roomdetails);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}else{
  try {

    const pms_propertymaster_roomdetails = await Pms_Propertymaster_Roomdetails.updateMany({ id: { $in: payload.ids } }, {status : payload.status});
  
    res = await Pms_Propertymaster_Roomdetails.find({"Hotel_Id": payload.Hotel_Id});
  
    console.log("Result Property: ", pms_propertymaster_roomdetails);
    data = { result: "Data updated successfully" };
  
  } catch (error) {
  
    console.error("Error:", error);
    data = { result: error };
    success = false;
    
  }
  return NextResponse.json({ data, res, success });
}






  } else if ( payload.action === "updatePhotos") {

    if(payload.selectedRoomId === "propertymain") {

      const pms_propertymaster_roomdetails = await Pms_Propertymaster_Roomdetails.updateMany({ Hotel_Id: payload.Hotel_Id }, { property_photos : payload.imageUrls });
      return NextResponse.json({ pms_propertymaster_roomdetails });

    }else {

      const pms_propertymaster_roomdetails = await Pms_Propertymaster_Roomdetails.updateOne({ _id: payload.selectedRoomId }, { room_photos : payload.imageUrls });
      return NextResponse.json({ pms_propertymaster_roomdetails });

    }

    
  }else if ( payload.action === "deletePhotos") {

    if(payload.selectedRoomId === "propertymain") {

      const pms_propertymaster_roomdetails = await Pms_Propertymaster_Roomdetails.updateMany({ Hotel_Id: payload.Hotel_Id }, { property_photos : payload.imageUrls });
      return NextResponse.json({ pms_propertymaster_roomdetails });

    }else {

      const pms_propertymaster_roomdetails = await Pms_Propertymaster_Roomdetails.updateOne({ _id: payload.selectedRoomId }, { room_photos : payload.imageUrls });
      return NextResponse.json({ pms_propertymaster_roomdetails });
      
    }

    
  } else {

      console.log("Add")
      try {

    //     let search = await Pms_Propertymaster_Roomdetails.find({
    //       amenities: { $regex: new RegExp(payload.amenities, 'i') },
    //       amenities_desc: { $regex: new RegExp(payload.amenities_desc, 'i') },
    //       value: { $regex: new RegExp(payload.value, 'i') }
    //   });

        // console.log("Search: ",search);
        
        //if(search.length === 0) {
          const pms_propertymaster_roomdetails = await Pms_Propertymaster_Roomdetails.create(payload);
          res = await Pms_Propertymaster_Roomdetails.find({"Hotel_Id": payload.Hotel_Id});
          console.log("Result Property: ", pms_propertymaster_roomdetails);
          data = { result: "Data inserted successfully" };
          dataAll = await Pms_Propertymaster_Roomdetails.find();
        //}else {
         // res = await Pms_Propertymaster_Roomdetails.find();
         // data = { result: "Data already existed" };
        //}


    } catch (error) {

        console.error("Error:", error);
        data = { result: error };
        success = false;

    }
    return NextResponse.json({ data, dataAll, res, success });





      
     }


}

