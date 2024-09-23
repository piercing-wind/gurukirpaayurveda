import NextAuth from "next-auth";
import authConfig from "@/auth.config";
const { auth } = NextAuth(authConfig);

import { apiAuthRoute, authRoute, DEFAULT_LOGIN_REDIRECT, publicRoute } from "@/route";

export default auth((req) => {
  const {nextUrl}  = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoute);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname) || nextUrl.pathname.startsWith('/shop');
  const isAuthRoute = authRoute.includes(nextUrl.pathname);

  //Do Not Change the order of the below id conditions. 

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return null;
});

export const config = {
   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};