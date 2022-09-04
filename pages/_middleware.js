import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


//if user has a token, let them through. otherwise, they cant access main page
export async function middleware(req){
    //token will exist if user is logged in
    const token = await getToken({req, secret: process.env.JWT_SECRET});

    const { pathname } = req.nextUrl;

    //Allow the requests if the following is true:
    //1. It is a request for fetching next-auth session and provider
    //2. The token exists

    if(pathname.includes("/api/auth/") ||  token){ 
        return NextResponse.next();
    };

    //If the token does not exist and the user requests a 
    //protected route, redirect to login page
    if(!token && pathname !=="/login"){
        const url = req.nextUrl.clone()
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }
}