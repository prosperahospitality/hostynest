import { NextResponse } from 'next/server';
import { decode } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname, cookies } = request;

  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authToken = cookies.get("next-auth.session-token")?.value;

    // if (!authToken) {
    //   return NextResponse.redirect(new URL('/adminlogin', request.url));
    // }

    try {
      const decoded = await decode({
        token: authToken,
        secret: '42dfd79ba11db84510c34d938d32987171bb48a4e8b1c533928286a8f497fda6',
      });

      console.log("Auth Token and Decoded:", authToken, decoded);

      if(decoded?.user?.user_role === "partner" || decoded?.user?.user_role === "guest" || authToken === undefined) {
        if (!request.nextUrl.pathname.startsWith('/adminlogin')) {
          return NextResponse.redirect(new URL('/adminlogin', request.url));
        }
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return NextResponse.redirect(new URL('/adminlogin', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/hotel')) {
    const authToken = cookies.get("next-auth.session-token")?.value;

    if (!authToken) {
      return NextResponse.redirect(new URL('/partnerlogin', request.url));
    }

    try {
      const decoded = await decode({
        token: authToken,
        secret: '42dfd79ba11db84510c34d938d32987171bb48a4e8b1c533928286a8f497fda6',
      });

      console.log("Auth Token and Decoded:", authToken, decoded);

      if (decoded?.user?.user_role === "guest") {
        return NextResponse.redirect(new URL('/partnerlogin', request.url));
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return NextResponse.redirect(new URL('/partnerlogin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: 'nodejs',
};
