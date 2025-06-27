import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;

  // ✅ Correct for Clerk v6.x
  const { userId } = auth();

  if (!userId) {
    return Response.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: [
    // Match all routes except static files, _next, and api
    "/((?!_next|.*\\..*|api).*)",
    "/(trpc)(.*)"
  ]
};
