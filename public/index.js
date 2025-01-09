'use client'
import * as React from "react"



const HotelName = ({ hotel_Name, onHotelName, hotel_ID }) => {
  var h_name = '';

  h_name = capitalize_each_word(hotel_Name);
  function capitalize_each_word(val) {

    if (val === undefined || val === null) {
      return ''; 
    }
  
    const words = val.toString().split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    var str = words.join("");
    var replacedStr = '';

    for (var i = 0; i < str.length; i++) {
      if (str[i] === ',') {
        replacedStr += '';
      } else {
        replacedStr += str[i];
      }
    }

    return replacedStr;
  }

  var Imgs = {
    [h_name + '1']:'/img/' + h_name + "-" + hotel_ID + '/Property Main-PM00001/1.jpg',
    [h_name + '2']:'/img/' + h_name + "-" + hotel_ID + '/Property Main-PM00001/2.jpg',
    [h_name + '3']:'/img/' + h_name + "-" + hotel_ID + '/Property Main-PM00001/3.jpg',
    [h_name + '4']:'/img/' + h_name + "-" + hotel_ID + '/Property Main-PM00001/4.jpg',
    [h_name + '5']:'/img/' + h_name + "-" + hotel_ID + '/Property Main-PM00001/5.jpg',
  }
  
   React.useEffect(() => {
    onHotelName(Imgs)
   }, [h_name]);

return <></>;

}

const IMAGES = {
    Logo: '/img/logo.png',
    Fulllogo: '/img/logoname.png',
    OwnerPhoto: '/img/owner-photo.jpg',
    Bg: '/img/bg.jpg',
    Mumbai:'/img/Mumbai.jpg',
    Delhi:'/img/Delhi.jpg',
    Kolkata:'/img/Kolkata.jpg',
    Bangalore:'/img/Bangalore.jpg',
    Hyderabad:'/img/Hyderabad.jpg',
    Chennai:'/img/Chennai.jpeg',
    Noida:'/img/Noida.jpg',
    Gurgaon:'/img/Gurgaon.jpeg',
    Pune:'/img/Pune.jpeg',
    Allcities:'/img/Allcities.jpg',
    Loginbg:'/img/loginbg.jpg',
    Hotelbg:'/img/hotelbg.jpg',
    Hotelbg1:'/img/hotelbg1.jpg',
    Darjiling:'/img/Heroimages/Darjiling.jpg',
    Goabeach:'/img/Heroimages/Goa-beach.jpg',
    Goa:'/img/Heroimages/Goa.jpg',
    Himachal:'/img/Heroimages/Himachal.jpg',
    Keralafarm:'/img/Heroimages/Keralafarm.jpg',
    Keralariver:'/img/Heroimages/Kerala-river.jpg',
    Lehladakh:'/img/Heroimages/Leh-ladakh.jpg',
    Mahabaleshwar:'/img/Heroimages/Mahabaleshwar.jpg',
    Manali:'/img/Heroimages/Manali.jpg',
    Punjab:'/img/Heroimages/Punjab.jpg',
    DiscGoa: '/img/Discover/Goa.jpg',
    DiscTaj: '/img/Discover/Taj.jpg',
    DiscJaipur: '/img/Discover/Jaipur.jpg',
    Disckerala: '/img/Discover/kerala.jpg',
    DiscRishikesh: '/img/Discover/Rishikesh.jpg',
    DiscJimcorbett: '/img/Discover/Jimcorbett.jpg',
    DiscPawna: '/img/Discover/Pawna.jpeg',
    DiscLadhak: '/img/Discover/Ladhak.jpg',
    DiscDarjeeling: '/img/Discover/Darjeeling.jpg',
    DiscEllora: '/img/Discover/Ellora.jpg',
    Rewardssectionreferral: '/img/Rewardssectionreferral.jpg',
    Jagganathrathyatra: '/img/ACROSSINDIA/Jagganathrathyatra.png',
    Ramzan: '/img/ACROSSINDIA/Ramzan.jpg',
    Bodhgaya: '/img/ACROSSINDIA/Bodhgaya.jpg',
    Churchgoa: '/img/ACROSSINDIA/Churchgoa.jpg',
    GangaArti: '/img/ACROSSINDIA/GangaArti.jpg',
    Goldentemple: '/img/ACROSSINDIA/Goldentemple.jpg',
    Lalbaughraja: '/img/ACROSSINDIA/Lalbaughraja.jpg',
    Adminloginbg: '/img/adminloginbg.jpg',
      sitelogo: '/img/favicon.ico',
  loginbg: '/img/loginbg.jpg'
}


export {IMAGES};
export default HotelName;