import { NextResponse } from 'next/server'
import { decrypt } from '@/app/api/auth/[...nextauth]/lib'
import { cookies } from 'next/headers'
import { getSession } from 'next-auth/react';
import { decode } from 'next-auth/jwt';
export async function middleware(request) {

  if (request.nextUrl.pathname.startsWith('/admin')) {

    const authToken = request.cookies.get("next-auth.session-token")?.value

    const decoded = await decode({
      token: authToken,
      secret: '42dfd79ba11db84510c34d938d32987171bb48a4e8b1c533928286a8f497fda6',
    });

    console.log("Auth Roken: ",authToken, decoded?.user?.user_role)

    if(decoded?.user?.user_role === "partner" || decoded?.user?.user_role === "guest" || authToken === undefined) {
      if (!request.nextUrl.pathname.startsWith('/adminlogin')) {
        return NextResponse.redirect(new URL('/adminlogin', request.url));
      }
    }

  }

  if (request.nextUrl.pathname.startsWith('/hotel')) {

    const authToken = request.cookies.get("next-auth.session-token")?.value

    const decoded = await decode({
      token: authToken,
      secret: '42dfd79ba11db84510c34d938d32987171bb48a4e8b1c533928286a8f497fda6',
    });

    console.log("Auth Roken: ",authToken, decoded)

    if(decoded?.user?.user_role === "guest" || authToken === undefined) {
      console.log("If")
      return NextResponse.redirect(new URL('/partnerlogin', request.url))
    }else{
      console.log("Else")
    }

  } 

  return NextResponse.next();

}
 
// export const config = {
//   matcher: '/admin/:path*',
// }