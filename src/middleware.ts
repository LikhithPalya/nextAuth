import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  //IS THE USER ACCESSING PUBLIC/PVT PATH
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

  const token = request.cookies.get('token')?.value || ''
// DONT ALLOW TO ACCESSS PUBLIC PATH IF YOU ARE LOGGED IN
  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }
// IF USER DOESNT HAVE A TOKEN AND IS ACCESSSING PVT PATH REDIRECT TO LOGIN!
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

 
// THE ABOVE LOGIC WORKS ONLY FOR THESE ROUTES, WHERE THE REQ IS HIT HERE BEFORE GOING TO PAGE
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}