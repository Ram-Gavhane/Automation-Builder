// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// 1. Define which routes are public
const isPublicRoute = createRouteMatcher([
  '/',                     // homepage
  '/sign-in(.*)',          // sign-in page
  '/sign-up(.*)',          // sign-up page
  '/api/webhooks(.*)',     // webhook endpoint
])

export default clerkMiddleware(async (auth, req) => {
  // If route is not public and user is not signed in → redirect
  if (!isPublicRoute(req) && ! (await auth()).userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // Otherwise continue
  return NextResponse.next()
})

// 2. Configure matcher
export const config = {
  matcher: [
    // Protect all routes except static files and Next.js internals
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
}
