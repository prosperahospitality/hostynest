import { NextResponse } from "next/server";


export async function GET(req) {

    let name_startsWith = req.nextUrl.searchParams.get('name_startsWith');
    let featureClass = req.nextUrl.searchParams.get('featureClass');
    let country = req.nextUrl.searchParams.get('country');
    console.log("Country:::::::>", country)
    let maxRows = req.nextUrl.searchParams.get('maxRows');

    let success = true;
    try {
        if (country === null) {
            const response = await fetch(
                `http://api.geonames.org/searchJSON?name_startsWith=${name_startsWith}&featureClass=${featureClass}&maxRows=${maxRows}&username=S2m3e7_`
            );
            const data = await response.json();
            return NextResponse.json(data)
        } else {
            const response = await fetch(
                `http://api.geonames.org/searchJSON?name_startsWith=${name_startsWith}&featureClass=${featureClass}&country=${country}&maxRows=${maxRows}&username=S2m3e7_`
            );
            const data = await response.json();
            return NextResponse.json(data)
        }
    } catch (error) {
        data = { result: "error" }
        success = false;
    }
    return NextResponse.json({ success })
}


export async function POST(req) {


    let success = true;


    try {



    } catch (error) {

        console.error("Error:", error);
        success = false;

    }
    return NextResponse.json({ success });
}

