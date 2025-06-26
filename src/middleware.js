import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Create a matcher for public routes (sign-in and sign-up)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // Allow public routes (sign-in and sign-up)
  if (isPublicRoute(req)) {
    return;
  }

  // Protect all other routes
  return auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}; 