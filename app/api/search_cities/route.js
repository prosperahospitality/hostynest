import  db  from "@/_lib/mongoDB";
import { Search_Cities } from "@/_lib/model/search_cities";
import { NextResponse } from "next/server";

export async function POST(request){
    const payload = await request.json();
    console.log("Payload::::>",payload.curr_val)
    let curr_val = payload.curr_val;
    let location = [];
    let location_like = [];
    let city = [];
    let city_like = [];
    let final_res = [];
    let final_res_like = [];
    let res_l_like;
    let res_c_like;
    let loc_subcity_like = [];
    let success=true;
    try {
      db.connect()
      location = await Search_Cities.find({'location' : curr_val}).select('city location -_id')

      location_like = await Search_Cities.find({'location' : {$regex : '.*' + curr_val + '.*'}}).select('city location -_id').limit(10);

      console.log("Result:::::::>",[...new Set(location_like.map(({location})=>location))]);

      res_l_like = [...new Set(location_like.map(({location})=>location))];

      res_l_like.map(async (loc) => {

        loc_subcity_like = await Search_Cities.find({'location' : loc}).select('city location -_id').limit(10);

        final_res_like.push({'location' : loc,
        'sub_cities' : (function () {
            let cities = [];
            for (let i = 0; i < loc_subcity_like.length; i++) {
                cities.push(loc_subcity_like[i].city);
            }
            return cities;
        })()
    });
        });

      city_like = await Search_Cities.find({'city' : {$regex : '.*' + curr_val + '.*'}}).select('city location -_id').limit(10);

      console.log("Result:::::::>",[...new Set(city_like.map(({city})=>city))]);

      res_c_like = [...new Set(city_like.map(({city})=>city))];

      res_c_like.map(async (cit) => {

        let r =  await Search_Cities.find({'city' : cit}).select('location -_id').limit(1);

        final_res_like.push({'location' : r[0].location,'city' : cit})}); 

      city = await Search_Cities.find({'city' : curr_val}).select('city location -_id')

      if(location.length != 0) {

        console.log("Location not null");

        final_res.push({"location" : location[0].location});

        for(var i=0 ; i<location.length ; i++) {
          final_res.push({"city" : location[i].city})
        }

      }else{
        console.log("Location is Empty");
      }
      
      if(city.length != 0) 
      {
        console.log("City not null");
        if(city[0].location.trim() === city[0].city.trim()) {

            console.log("Invalid City");
    
          }else{
            final_res.push({'location' : city[0].location},{'city' : city[0].city})
          }

          
      }else{
        console.log("City is Empty");
      }
  
      
      
    } catch (error) {
        console.log("Error::::::>",error);
    location={result:"error"}
      success=false;
    }
    return NextResponse.json({final_res, final_res_like, success})
}




