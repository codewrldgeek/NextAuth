import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { 
    DEFAULT_LOGIN_REDIRECT_URL,
    apiAuthPrefix,
    authRoutes,
    publicRoutes 
} from "./routes";

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isLoggedIn = !!token;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // Allow API auth routes to pass
    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    // Handle authenticated users for auth-required routes
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl));
        }
        return NextResponse.next();
    }

    // Redirect unauthenticated users trying to access protected routes
    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
