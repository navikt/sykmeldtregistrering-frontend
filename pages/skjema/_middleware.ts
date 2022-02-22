import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function redirectUrlUtenSideParam(req: NextRequest) {
    const { params } = req.page;

    if (!params) {
        const url = req.nextUrl.clone();
        url.pathname = '/skjema/0';
        return NextResponse.redirect(url);
    }
}
