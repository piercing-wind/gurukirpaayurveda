import NextAuth from "next-auth";
import authConfig from "@/auth.config";
const { auth } = NextAuth(authConfig);

import { apiAuthRoute, authRoute, DEFAULT_LOGIN_REDIRECT, publicRoute } from "@/route";

export default auth((req) => {
  const {nextUrl}  = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoute);
  const isPublicRoute = publicRoute.some(route => 
   nextUrl.pathname === route || nextUrl.pathname.startsWith('/api/phonepe') || nextUrl.pathname.startsWith('/api/dump')
  );
  const isAuthRoute = authRoute.includes(nextUrl.pathname);

  //Do Not Change the order of the below id conditions. 

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return;
});

export const config = {
   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};