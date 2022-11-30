import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('leon-request-header', 'v13.0.0');
  requestHeaders.set('x-hello-from-middleware1', 'hello')

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })

  response.headers.set('Leon-Custom-Cache-Control', 'public, s-maxage=10, stale-while-revalidate=10');
  response.headers.set('Cloudflare-CDN-Cache-Control', 'public, s-maxage=10, stale-while-revalidate=10');
  response.headers.set('CDN-Cache-Control', 'public, s-maxage=10, stale-while-revalidate=10');
  response.headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=10');
  return response;
}
