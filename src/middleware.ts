import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 로그인 여부를 검사하는 미들웨어 입니다.
 */
export async function middleware(req: NextRequest) {
  // - secret 굳이 안적어줘도 getToken내부에서 process.env.NEXTAUTH_SECRET를 찾아서 사용함,
  // - jwt callback에서 사용하는 secret와 동일해야함
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const pathname = req.nextUrl.pathname

  // user 페이지는 로그인이 되어있어야 접근 가능
  if (pathname.startsWith('/user') && !session) {
    const url = new URL('/api/auth/signin', req.url)
    return NextResponse.redirect(url)
  }

  // admin 페이지는 admin 권한이 있어야 접근 가능
  if (pathname.startsWith('/admin') && (!session || session.role !== 'admin')) {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }

  // 로그인된 유저는 signin/out 접근 안됨
  if (pathname.startsWith('/auth') && session) {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }

  /**
   * @todo 로그인 실패시 여기서 처리하고있음 따로 매시지를 보내주는게 좋을듯
   */
  if (req.nextUrl.pathname.startsWith('/api')) {
    return new NextResponse('Authentication Error', { status: 401 })
  }

  return NextResponse.next()
}

// 로그인을 해야하는 경우만 미들웨어 사용
export const config = {
  matcher: ['/admin/:path*', '/user', '/auth/:path*'],
}
