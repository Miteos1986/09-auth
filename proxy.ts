import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { api } from "@/app/api/api";

const authRoutes = ["/sign-in", "/sign-up"];
const privateRoutes = ["/profile", "/notes"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      try {
        const response = await api.get("/auth/session", {
          headers: { Cookie: cookieStore.toString() },
        });

        const setCookie = response.headers["set-cookie"];
        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];

          for (const cookieString of cookieArray) {
            const parsed = parse(cookieString);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed["Max-Age"]),
            };

            if (parsed.accessToken) {
              cookieStore.set("accessToken", parsed.accessToken, options);
            }
            if (parsed.refreshToken) {
              cookieStore.set("refreshToken", parsed.refreshToken, options);
            }
          }
        }
      } catch (err) {
        console.log("Failed to refresh token:", err);
      }
    }

    if (isAuthRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (accessToken) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isPrivateRoute) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
