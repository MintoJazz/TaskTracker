import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get('meu_token')?.value;
    const rotaAtual = request.nextUrl.pathname

    if (!token && rotaAtual !== '/login') return NextResponse.redirect(new URL('/login', request.url))
    
    return NextResponse.next()
}

export const config = { matcher: [ '/((?!api|_next/static|_next/image|favicon.ico).*)' ] }