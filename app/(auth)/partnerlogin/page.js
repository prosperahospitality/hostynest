'use client'
import React, {useEffect,useState} from "react";
import { Input, Button, Checkbox } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon, Logo } from '@/app/_components/icon'
import { Comfortaa } from 'next/font/google'
import { SessionProvider, useSession, getSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const comfortaa400 = Comfortaa({
  weight: '400',
  subsets: ['latin'],
})

export default function PartnerloginPage() {

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [propCode, setPropCode] = useState();
  const [userID, setUserID] = useState();
  const [password, setPassword] = useState();

  let router = useRouter();

  const [session, setSession] = useState({});
  useEffect(() => {
    const getSessionInfo = async () => {
      const session = await getSession();
      setSession(session);
    };
    getSessionInfo();
  }, [])

  useEffect(() => {
    console.log("Session at partner page: ",session)
  }, [session])

  const handleLoginAction = async () => {
    console.log("Data Partner: ", propCode,
    userID,
    password)

    const result = await signIn("credentials", {

      propCode: propCode,
      
      userID: userID,

      password: password,

      user_role: "partner",

      redirect: false,

      //callbackUrl: "hotel/dashboard"

    }).catch((error) => {
     
    });

    if(result.ok === true) {

      const res = await fetch("http://192.168.29.228:3000/api/hotels/hotel_info/hotel_by_id", {
        method: 'POST',
        body: JSON.stringify({hotelId : propCode}),
        headers: { "Content-Type": "application/json" }
      })
      const use = await res.json()

      console.log("USER:::::::>",use?.data.Hotel_name)
      const hotel = use?.data;

      router.push(`hotel/dashboard?hotel_id=${propCode}&hotel_name=${hotel.Hotel_name}`)
      
    }else if(result.ok === false){
      alert("Username or password is incorrect!")
      //window.location.reload()
    }

    console.log("Result::::>",result)

  }

  return (
    <div className="w-screen h-screen">
      <BgSVG />
      <div className="absolute flex h-full">
        <div className="flex flex-col items-center mt-20 pl-16">
          <div className="flex items-center gap-2 mr-56">
            <Logo size={50} />
            <h4 className={`${comfortaa400.className}`}>HostyNest</h4>
          </div>
          <div className="mr-28 mt-10 space-y-2">
            <h4 className={`${comfortaa400.className} text-base`}>Welcome to</h4>
            <h2 className={`${comfortaa400.className} text-5xl font-semibold`}>HostyNest</h2>
          </div>
          <Input 
            type="text" 
            placeholder="Property Code" 
            color="primary" 
            variant="underlined" 
            className="text-black mt-10" 
            startContent={<Propertybuilding size={40} />} 
            value={propCode}
            onChange={(e) => setPropCode(e.target.value)}
          />
          <Input 
            type="text" 
            placeholder="UserName" 
            color="primary" 
            variant="underlined" 
            className="text-black mt-6" 
            startContent={<UserProfile size={40} />} 
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
          <Input
            variant="underlined"
            color="primary"
            placeholder="Enter your password"
            startContent={<Key size={40} />}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="text-black mt-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-20">
            <Checkbox size="sm" >Remember me</Checkbox>
            <Button size="md" radius="lg" className="bg-transparent text-primary" >Forgot password?</Button>
          </div>
          <Button variant="shadow" color="primary" size="lg" radius="lg" className="mt-8 w-full" onClick={handleLoginAction}>Login</Button>
        </div>
      </div>
      <div className="absolute w-[35%] right-0 mt-20">
        <div >
          <h3 className={`${comfortaa400.className} text-xl text-white font-semibold}`}>About Us</h3>
          <div className="mt-4">
            <span className="text-white text-sm pr-6">We at HostyNest aim to revolutionize the Hospitality Industry,With our best in class Inventory management system which caters to needs of each hotel owner, We are able to make room affordable for the guest thereby boosting business and growth for all.</span>
          </div>
        </div>
        <div className="mt-8">
          <h3 className={`${comfortaa400.className} text-xl text-white font-semibold}`}>Features</h3>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <h6 className="text-white text-sm">24 x 7 Support</h6>
            <h6 className="text-white text-sm">Revenue Management System</h6>
            <h6 className="text-white text-sm">Transparent Process</h6>
            <h6 className="text-white text-sm">Online Presence</h6>
            <h6 className="text-white text-sm">Secured Payments</h6>
            <h6 className="text-white text-sm">Inventory Management System</h6>
          </div>
        </div>
      </div>
    </div>
  )
};


const UserProfile = ({ size, height, width, fill, ...props }) => {
  return (
    <svg
      fill="#007ebb"
      height={size || height || 24}
      viewBox="0 0 256 256"
      width={size || width || 24}
      {...props}
    >
      <path d="M227.46,214c-16.52-28.56-43-48.06-73.68-55.09a68,68,0,1,0-51.56,0c-30.64,7-57.16,26.53-73.68,55.09a4,4,0,0,0,6.92,4C55,184.19,89.62,164,128,164s73,20.19,92.54,54a4,4,0,0,0,3.46,2,3.93,3.93,0,0,0,2-.54A4,4,0,0,0,227.46,214ZM68,96a60,60,0,1,1,60,60A60.07,60.07,0,0,1,68,96Z">
      </path>
    </svg>
  );
};

const Propertybuilding = ({ size, height, width, fill, ...props }) => {
  return (
    <svg
      fill="#007ebb"
      height={size || height || 24}
      viewBox="0 0 256 256"
      width={size || width || 24}
      {...props}
    >
      <path d="M240,212H220V96a12,12,0,0,0-12-12H140V32a12,12,0,0,0-18.66-10l-80,53.33a12,12,0,0,0-5.34,10V212H16a4,4,0,0,0,0,8H240a4,4,0,0,0,0-8ZM208,92a4,4,0,0,1,4,4V212H140V92ZM44,85.34A4,4,0,0,1,45.78,82l80-53.33A4,4,0,0,1,132,32V212H44ZM108,112v16a4,4,0,0,1-8,0V112a4,4,0,0,1,8,0Zm-32,0v16a4,4,0,0,1-8,0V112a4,4,0,0,1,8,0Zm0,56v16a4,4,0,0,1-8,0V168a4,4,0,0,1,8,0Zm32,0v16a4,4,0,0,1-8,0V168a4,4,0,0,1,8,0Z">
      </path>
    </svg>
  );
};


const Key = ({ size, height, width, fill, ...props }) => {
  return (
    <svg
      fill="#007ebb"
      height={size || height || 24}
      viewBox="0 0 256 256"
      width={size || width || 24}
      {...props}
    >
      <path d="M213.74,42.26A76,76,0,0,0,88.51,121.84l-57,57A11.93,11.93,0,0,0,28,187.31V216a12,12,0,0,0,12,12H72a4,4,0,0,0,4-4V204H96a4,4,0,0,0,4-4V180h20a4,4,0,0,0,2.83-1.17l11.33-11.34A75.72,75.72,0,0,0,160,172h.1A76,76,0,0,0,213.74,42.26Zm14.22,56c-1.15,36.22-31.6,65.72-67.87,65.77H160a67.52,67.52,0,0,1-25.21-4.83,4,4,0,0,0-4.45.83l-12,12H96a4,4,0,0,0-4,4v20H72a4,4,0,0,0-4,4v20H40a4,4,0,0,1-4-4V187.31a4.06,4.06,0,0,1,1.17-2.83L96,125.66a4,4,0,0,0,.83-4.45A67.51,67.51,0,0,1,92,95.91C92,59.64,121.55,29.19,157.77,28A68,68,0,0,1,228,98.23ZM188,76a8,8,0,1,1-8-8A8,8,0,0,1,188,76Z">
      </path>
    </svg>
  );
};

const BgSVG = ({ size, height, width, fill, ...props }) => {
  return (
    <svg
      fill="none"
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1398 868"
      preserveAspectRatio="xMidYMid slice"
    >

      <g clip-path="url(#clip0_832_2)">
        <rect width="1440" height="800" fill="white" />
        <path d="M700.203 170.493L762.874 0H1440V802H1426.38C1118.47 759.718 991.763 758.354 918.192 664.242L731.539 323.255C682.491 256.695 683.854 205.956 700.203 170.493Z" fill="#0374FA" />
        <path d="M1439 668C1128 595.001 1018 647 932 678C936 686.401 968 707.834 983.5 717.5L1439 799.5V668Z" fill="#AFD4FF" fill-opacity="0.1" />
        <path d="M1421.82 658.547C1402.32 654.545 1398.82 673.544 1411.32 682.047L1416.82 683.044C1443.82 683.044 1431.32 659.545 1421.82 658.547Z" fill="#005ECE" />
        <path d="M1416 683C1408 682.111 1405.5 675.5 1404.5 672.5C1406.1 674.9 1420.81 678.5 1431 678.5C1430 680 1423.2 683.8 1416 683Z" fill="#0B7AFF" />
        <path d="M1412.5 697L1407 695C1409.5 689.667 1413.6 677.8 1410 673V670L1414 681L1417.67 673.661C1417.95 672.166 1418.32 671 1419 671L1417.67 673.661C1417.29 675.698 1417.08 678.347 1416.5 679.5L1425.63 674.477C1425.92 674.305 1426.21 674.146 1426.5 674L1425.63 674.477C1418.06 679.021 1412.34 692.343 1412.5 697Z" fill="#2A2A59" />
        <path d="M1266.51 641.503C1252.19 642.372 1253.31 656.254 1263.6 659.831L1267.62 659.495C1286.42 654.435 1273.31 640.418 1266.51 641.503Z" fill="#005ECE" />
        <path d="M1267.04 659.618C1261.3 660.498 1258.32 656.364 1257.07 654.463C1258.63 655.834 1269.55 655.583 1276.64 653.674C1276.22 654.906 1272.2 658.826 1267.04 659.618Z" fill="#0B7AFF" />
        <path d="M1267.23 670.022L1263.02 669.66C1263.76 665.479 1264.39 656.449 1260.99 653.782L1260.43 651.694L1265.27 658.602L1266.45 652.806C1266.37 651.712 1266.41 650.83 1266.88 650.703L1266.45 652.806C1266.57 654.295 1266.92 656.179 1266.73 657.089L1272.15 651.881C1272.32 651.708 1272.49 651.543 1272.66 651.386L1272.15 651.881C1267.73 656.464 1266.24 666.81 1267.23 670.022Z" fill="#2A2A59" />
        <path d="M1300.14 652.828C1289.67 653.462 1290.5 663.605 1298.02 666.219L1300.95 665.973C1314.69 662.276 1305.11 652.035 1300.14 652.828Z" fill="#005ECE" />
        <path d="M1300.53 666.063C1296.34 666.706 1294.16 663.686 1293.24 662.297C1294.38 663.299 1302.36 663.115 1307.54 661.721C1307.24 662.62 1304.3 665.484 1300.53 666.063Z" fill="#0B7AFF" />
        <path d="M1300.66 673.664L1297.59 673.4C1298.13 670.345 1298.59 663.747 1296.11 661.799L1295.7 660.273L1299.24 665.32L1300.1 661.085C1300.04 660.286 1300.07 659.642 1300.41 659.549L1300.1 661.085C1300.18 662.173 1300.44 663.55 1300.3 664.215L1304.26 660.41C1304.38 660.283 1304.51 660.163 1304.64 660.048L1304.26 660.41C1301.03 663.758 1299.94 671.317 1300.66 673.664Z" fill="#2A2A59" />
        <path d="M1371.5 686C1363.1 685.2 1331.67 680.667 1317 678.5L1319.5 638.5L1330 627.5L1359.5 613.5L1381 638.5L1382 652.5L1371.5 686Z" fill="#EF4B6B" />
        <path d="M1329.5 624L1309 647L1312 649.5L1331 627.5L1360 614L1381 640.5L1384.5 666H1388.5L1385 638.5L1360.5 609L1329.5 624Z" fill="#493C33" />
        <path d="M1366 632.5L1348.5 629.5V640.5L1362 643L1366 632.5Z" fill="#352534" stroke="white" stroke-width="2" />
        <path d="M1335 679L1337.5 650M1335 679L1351.75 653.25M1335 679L1347 680.882M1337.5 650L1351.75 653.25M1337.5 650L1347 680.882M1366 656.5L1360.5 683M1366 656.5L1351.75 653.25M1366 656.5L1347.75 681M1360.5 683L1347.75 681M1360.5 683L1351.75 653.25M1351.75 653.25L1347.75 681M1347.75 681L1347 680.882" stroke="white" stroke-width="2" />
        <path d="M984.046 718L963 706C995.067 706 1205.01 661.502 1221.54 666.501C1231.56 662.502 1401.92 683.001 1440 708V737L984.046 718Z" fill="#005BC7" />
        <path d="M1440 726.286C1327.51 660.145 1084.46 690.095 977 713.337C989.856 742.822 1291.02 782.731 1440 799V726.286Z" fill="#0A67D6" />
        <path d="M1271 566H1351L1343.17 561.618C1344.57 545.483 1331.58 546.125 1324.91 548.463C1311.7 530.925 1304.33 544.662 1302.3 553.723C1293.26 546.708 1289.84 554.893 1289.26 559.862L1271 566Z" fill="white" />
        <path d="M1089 573H1144L1138.62 569.966C1139.58 558.796 1130.65 559.24 1126.07 560.859C1116.98 548.717 1111.92 558.228 1110.52 564.501C1104.3 559.644 1101.95 565.31 1101.55 568.75L1089 573Z" fill="white" />
        <path d="M1167 528H1266L1256.32 522.607C1258.04 502.748 1241.97 503.538 1233.72 506.416C1217.36 484.83 1208.25 501.738 1205.74 512.89C1194.55 504.256 1190.32 514.329 1189.6 520.445L1167 528Z" fill="white" fill-opacity="0.5" />
        <path d="M994 548H1037L1032.79 545.64C1033.54 536.952 1026.56 537.298 1022.98 538.557C1015.87 529.113 1011.92 536.51 1010.83 541.389C1005.97 537.612 1004.13 542.019 1003.82 544.695L994 548Z" fill="white" fill-opacity="0.5" />
        <path d="M1241.83 766.001C1235.43 766.001 1236.06 761.556 1237.17 759.334C1233.39 760.001 1226.64 760.4 1229.84 756.667C1233.04 752.933 1236.06 754.222 1237.17 755.333V754.667C1236.5 753.111 1236.5 750 1241.84 750C1247.17 750 1246.72 754 1245.84 756L1246.5 755.334C1248.28 754.445 1252.1 753.868 1253.17 758.668C1254.24 763.468 1247.84 761.556 1244.5 760.001C1246.28 762.001 1248.23 766.001 1241.83 766.001Z" fill="#FFF9D8" />
        <path d="M1246.33 757.333C1246.33 759.174 1243.94 760.667 1241 760.667C1238.05 760.667 1235.67 759.174 1235.67 757.333C1235.67 755.492 1238.05 754 1241 754C1243.94 754 1246.33 755.492 1246.33 757.333Z" fill="#6C7BFF" />
        <path d="M1307.07 741.569C1304.04 741.569 1304.34 739.467 1304.86 738.416C1303.08 738.731 1299.88 738.92 1301.4 737.154C1302.91 735.388 1304.34 735.997 1304.86 736.523V736.208C1304.55 735.472 1304.55 734 1307.07 734C1309.59 734 1309.38 735.892 1308.96 736.838L1309.28 736.523C1310.12 736.103 1311.93 735.83 1312.43 738.1C1312.94 740.371 1309.91 739.467 1308.33 738.731C1309.17 739.677 1310.1 741.569 1307.07 741.569Z" fill="#FFF9D8" />
        <path d="M1309.2 737.469C1309.2 738.34 1308.07 739.046 1306.68 739.046C1305.28 739.046 1304.15 738.34 1304.15 737.469C1304.15 736.599 1305.28 735.893 1306.68 735.893C1308.07 735.893 1309.2 736.599 1309.2 737.469Z" fill="#6C7BFF" />
        <path d="M1381.45 736.569C1379.73 736.569 1379.9 735.374 1380.2 734.777C1379.18 734.956 1377.36 735.063 1378.22 734.06C1379.08 733.056 1379.9 733.403 1380.2 733.701V733.522C1380.02 733.104 1380.02 732.268 1381.45 732.268C1382.88 732.268 1382.77 733.343 1382.53 733.881L1382.71 733.702C1383.18 733.463 1384.21 733.307 1384.5 734.598C1384.78 735.888 1383.06 735.374 1382.17 734.956C1382.65 735.494 1383.17 736.569 1381.45 736.569Z" fill="#FFF9D8" />
        <path d="M1382.66 734.24C1382.66 734.735 1382.02 735.136 1381.23 735.136C1380.43 735.136 1379.79 734.735 1379.79 734.24C1379.79 733.745 1380.43 733.344 1381.23 733.344C1382.02 733.344 1382.66 733.745 1382.66 734.24Z" fill="#6C7BFF" />
        <path d="M937 687C940.448 686.041 945.644 684.693 952 683.103V673.001H956V682.107C964.439 680.019 974.48 677.602 985 675.134V666.001H989V674.199C1000.23 671.581 1011.84 668.946 1022.5 666.622V662.5H1027.5V665.539C1045.68 661.635 1060.26 658.858 1064 659.001V664.502C1056.81 665.7 1043.15 668.245 1027.5 671.33V685.716C1043.55 682.75 1057.63 680.174 1064 679V685C1060.17 684.522 1045.14 686.837 1027.5 690.037V704.001H1022.5V690.955C1011.34 693.025 999.497 695.366 989 697.525V709.501H985V698.353C973.288 700.79 963.735 702.906 959.5 704.001L953.5 700.063L952 699.501V687.851C946.078 689.465 942.376 690.748 942 691.501L937 687Z" fill="white" />
        <path d="M956 699V686.5C964.667 684 982.1 679.1 982.5 679.5L983.5 679.5L984 693C982.8 692.2 964.833 696.666 956 699Z" fill="#147EFB" />
        <path d="M987 692V679.195C998.143 676.634 1020.56 671.614 1021.07 672.024L1023 671.5V685.853C1021.46 685.034 998.357 689.61 987 692Z" fill="#147EFB" />
        <path d="M1129.8 679.03H1129.42C1129.17 679.03 1128.96 679.234 1128.96 679.485C1128.96 679.736 1129.17 679.939 1129.42 679.939H1129.77H1130.58H1131.39V678.4C1131.39 678.246 1131.26 678.121 1131.11 678.121C1131.03 678.121 1130.95 678.155 1130.9 678.215L1130.42 678.749C1130.27 678.928 1130.04 679.03 1129.8 679.03Z" fill="#FFB132" />
        <path d="M1131.39 679.939V678.4C1131.39 678.246 1131.26 678.121 1131.11 678.121V678.121C1131.03 678.121 1130.95 678.155 1130.9 678.215L1130.42 678.749C1130.27 678.928 1130.04 679.03 1129.8 679.03H1129.42C1129.17 679.03 1128.96 679.234 1128.96 679.485V679.485C1128.96 679.736 1129.17 679.939 1129.42 679.939H1129.77H1130.58H1131.39ZM1131.39 679.939V680.953C1131.39 681.313 1131 681.54 1130.69 681.363V681.363C1130.62 681.324 1130.54 681.303 1130.46 681.303H1129.77" stroke="#FFB132" />
        <path d="M1135.5 669.269L1136.94 669.987C1137.28 670.157 1137.63 670.289 1138 670.381L1138.96 670.62C1139.55 670.767 1140.17 670.699 1140.71 670.427C1140.96 670.305 1141.18 670.144 1141.38 669.95L1142.3 669.03L1142.36 668.97C1142.71 668.621 1142.9 668.147 1142.9 667.652V667.587C1142.9 667.34 1142.84 667.097 1142.73 666.877L1142.65 666.704C1142.43 666.273 1141.99 666 1141.51 666C1141.23 666 1140.96 666.089 1140.74 666.255L1139.7 667.039C1139.1 667.486 1138.27 667.427 1137.74 666.899C1137.55 666.707 1137.31 666.571 1137.04 666.505L1135.7 666.17C1135.28 666.064 1134.83 666.188 1134.53 666.495C1134.11 666.912 1134.05 667.565 1134.37 668.056L1134.73 668.585C1134.92 668.877 1135.19 669.113 1135.5 669.269Z" fill="#F04B6A" stroke="#F04B6A" />
        <path d="M1144.34 698.727V705.999H1139.87H1149.44M1151.99 705.999H1149.44M1149.44 705.999V698.727" stroke="#FFAF3B" stroke-width="1.5" stroke-linecap="round" />
        <path d="M1156.46 684.705L1136.6 684.291C1133.34 684.223 1130.04 683.466 1131.01 686.588C1131.56 688.36 1132.33 690.541 1133.06 692.501C1133.55 693.813 1134.3 695.034 1135.4 695.888C1141.19 700.347 1148.06 699.334 1151.39 699.334C1153.76 699.334 1156.3 696.636 1157.81 694.547C1158.41 693.725 1159.07 692.953 1159.74 692.194C1160.93 690.857 1161.47 689.601 1161.62 688.502C1161.97 685.946 1159.04 684.758 1156.46 684.705Z" fill="#F7F2B3" />
        <path d="M1145.93 680.546C1145.93 686.571 1143.51 692.061 1138.66 691.455C1133.85 690.854 1131.39 686.571 1131.39 680.546C1131.39 674.521 1132.6 669.637 1138.66 669.637C1144.11 669.637 1145.93 674.521 1145.93 680.546Z" fill="#FFDA44" />
        <circle cx="1.81818" cy="1.81818" r="1.81818" transform="matrix(-1 0 0 1 1139.87 676.908)" fill="#56472E" />
        <path d="M1146.54 695.698C1140.48 689.637 1148.96 685.395 1153.21 685.395C1153.41 685.799 1152.6 683.213 1152.6 681.758C1152.6 679.94 1153.72 678.728 1159.18 680.546C1163.54 682 1164.11 685.799 1162.9 687.213L1159.18 689.637C1159.18 693.273 1152.37 701.527 1146.54 695.698Z" fill="#FFE98F" />
        <path d="M1147.14 693.879C1148.15 695.697 1150.78 698.243 1153.21 693.879" stroke="#F14669" stroke-width="1.5" stroke-linecap="round" />
        <path d="M1175.43 687.698H1175.23C1175.1 687.698 1175 687.802 1175 687.931C1175 688.061 1175.1 688.165 1175.23 688.165H1175.42H1175.83H1176.25V687.374C1176.25 687.295 1176.18 687.23 1176.1 687.23C1176.06 687.23 1176.02 687.248 1176 687.279L1175.75 687.553C1175.67 687.645 1175.55 687.698 1175.43 687.698Z" fill="#FFB132" />
        <path d="M1176.25 688.165V687.374C1176.25 687.295 1176.18 687.23 1176.1 687.23V687.23C1176.06 687.23 1176.02 687.248 1176 687.279L1175.75 687.553C1175.67 687.645 1175.55 687.698 1175.43 687.698H1175.23C1175.1 687.698 1175 687.802 1175 687.931V687.931C1175 688.061 1175.1 688.165 1175.23 688.165H1175.42H1175.83H1176.25ZM1176.25 688.165V688.687C1176.25 688.871 1176.05 688.988 1175.89 688.897V688.897C1175.85 688.877 1175.81 688.866 1175.77 688.866H1175.42" stroke="#FFB132" />
        <path d="M1178.36 682.681L1179.1 683.049C1179.27 683.137 1179.46 683.205 1179.65 683.252L1180.14 683.375C1180.44 683.451 1180.76 683.416 1181.04 683.276C1181.17 683.213 1181.28 683.13 1181.38 683.031L1181.85 682.558L1181.88 682.527C1182.06 682.347 1182.17 682.103 1182.17 681.849V681.816C1182.17 681.689 1182.14 681.564 1182.08 681.451L1182.04 681.362C1181.92 681.14 1181.7 681 1181.45 681C1181.31 681 1181.17 681.046 1181.06 681.131L1180.52 681.534C1180.21 681.764 1179.78 681.733 1179.51 681.462C1179.41 681.364 1179.29 681.294 1179.15 681.26L1178.46 681.087C1178.25 681.033 1178.02 681.097 1177.86 681.255C1177.65 681.469 1177.61 681.805 1177.78 682.057L1177.96 682.329C1178.06 682.479 1178.2 682.6 1178.36 682.681Z" fill="#F04B6A" stroke="#F04B6A" />
        <path d="M1182.9 697.824V701.563H1180.61H1185.53M1186.84 701.563H1185.53M1185.53 701.563V697.824" stroke="#FFAF3B" stroke-width="1.5" stroke-linecap="round" />
        <path d="M1187.57 690.582L1181.22 690.45C1178.1 690.385 1175.5 690.046 1176.52 692.987C1176.96 694.246 1177.94 696.2 1179.08 696.888C1181.87 698.572 1184.96 698.135 1186.53 698.135C1187.58 698.135 1188.69 697.115 1189.47 696.147C1190.05 695.435 1191.12 694.272 1191.52 693.446C1192.52 691.344 1189.9 690.631 1187.57 690.582Z" fill="#F7F2B3" />
        <path d="M1183.72 688.477C1183.72 691.575 1182.48 694.397 1179.98 694.085C1177.51 693.776 1176.25 691.575 1176.25 688.477C1176.25 685.38 1176.87 682.869 1179.98 682.869C1182.79 682.869 1183.72 685.38 1183.72 688.477Z" fill="#FFDA44" />
        <circle cx="0.934693" cy="0.934693" r="0.934693" transform="matrix(-1 0 0 1 1180.61 686.607)" fill="#56472E" />
        <path d="M1184.03 696.267C1180.92 693.152 1185.28 690.971 1187.46 690.971C1187.57 691.178 1187.15 689.849 1187.15 689.101C1187.15 688.167 1187.73 687.543 1190.53 688.478C1192.77 689.226 1193.07 691.178 1192.45 691.905L1190.53 693.152C1190.53 695.021 1187.03 699.264 1184.03 696.267Z" fill="#FFE98F" />
        <path d="M1184.35 695.332C1184.87 696.267 1186.22 697.575 1187.46 695.332" stroke="#F14669" stroke-width="1.5" stroke-linecap="round" />
        <path d="M1200.43 687.698H1200.23C1200.1 687.698 1200 687.802 1200 687.931C1200 688.061 1200.1 688.165 1200.23 688.165H1200.42H1200.83H1201.25V687.374C1201.25 687.295 1201.18 687.23 1201.1 687.23C1201.06 687.23 1201.02 687.248 1201 687.279L1200.75 687.553C1200.67 687.645 1200.55 687.698 1200.43 687.698Z" fill="#FFB132" />
        <path d="M1201.25 688.165V687.374C1201.25 687.295 1201.18 687.23 1201.1 687.23V687.23C1201.06 687.23 1201.02 687.248 1201 687.279L1200.75 687.553C1200.67 687.645 1200.55 687.698 1200.43 687.698H1200.23C1200.1 687.698 1200 687.802 1200 687.931V687.931C1200 688.061 1200.1 688.165 1200.23 688.165H1200.42H1200.83H1201.25ZM1201.25 688.165V688.687C1201.25 688.871 1201.05 688.988 1200.89 688.897V688.897C1200.85 688.877 1200.81 688.866 1200.77 688.866H1200.42" stroke="#FFB132" />
        <path d="M1203.36 682.681L1204.1 683.049C1204.27 683.137 1204.46 683.205 1204.65 683.252L1205.14 683.375C1205.44 683.451 1205.76 683.416 1206.04 683.276C1206.17 683.213 1206.28 683.13 1206.38 683.031L1206.85 682.558L1206.88 682.527C1207.06 682.347 1207.17 682.103 1207.17 681.849V681.816C1207.17 681.689 1207.14 681.564 1207.08 681.451L1207.04 681.362C1206.92 681.14 1206.7 681 1206.45 681C1206.31 681 1206.17 681.046 1206.06 681.131L1205.52 681.534C1205.21 681.764 1204.78 681.733 1204.51 681.462C1204.41 681.364 1204.29 681.294 1204.15 681.26L1203.46 681.087C1203.25 681.033 1203.02 681.097 1202.86 681.255C1202.65 681.469 1202.61 681.805 1202.78 682.057L1202.96 682.329C1203.06 682.479 1203.2 682.6 1203.36 682.681Z" fill="#F04B6A" stroke="#F04B6A" />
        <path d="M1207.9 697.824V701.563H1205.61H1210.53M1211.84 701.563H1210.53M1210.53 701.563V697.824" stroke="#FFAF3B" stroke-width="1.5" stroke-linecap="round" />
        <path d="M1212.57 690.582L1206.22 690.45C1203.1 690.385 1200.5 690.046 1201.52 692.987C1201.96 694.246 1202.94 696.2 1204.08 696.888C1206.87 698.572 1209.96 698.135 1211.53 698.135C1212.58 698.135 1213.69 697.115 1214.47 696.147C1215.05 695.435 1216.12 694.272 1216.52 693.446C1217.52 691.344 1214.9 690.631 1212.57 690.582Z" fill="#F7F2B3" />
        <path d="M1208.72 688.477C1208.72 691.575 1207.48 694.397 1204.98 694.085C1202.51 693.776 1201.25 691.575 1201.25 688.477C1201.25 685.38 1201.87 682.869 1204.98 682.869C1207.79 682.869 1208.72 685.38 1208.72 688.477Z" fill="#FFDA44" />
        <circle cx="0.934693" cy="0.934693" r="0.934693" transform="matrix(-1 0 0 1 1205.61 686.607)" fill="#56472E" />
        <path d="M1209.03 696.267C1205.92 693.152 1210.28 690.971 1212.46 690.971C1212.57 691.178 1212.15 689.849 1212.15 689.101C1212.15 688.167 1212.73 687.543 1215.53 688.478C1217.77 689.226 1218.07 691.178 1217.45 691.905L1215.53 693.152C1215.53 695.021 1212.03 699.264 1209.03 696.267Z" fill="#FFE98F" />
        <path d="M1209.35 695.332C1209.87 696.267 1211.22 697.575 1212.46 695.332" stroke="#F14669" stroke-width="1.5" stroke-linecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_832_2">
          <rect width="1440" height="800" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};