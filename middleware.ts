import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function shouldRedirectToLogin(req: NextRequest) {
    const { cookies } = req;
    const url = req.nextUrl.clone();
    const brukerMock = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'enabled';
    const erInnlogget = cookies.get('selvbetjening-idtoken');
    const apneSider = ['/', '/api/config/', '/api/features/'];
    const erApenSide = apneSider.includes(url.pathname);

    if (erApenSide || brukerMock) {
        return false;
    }

    return !erInnlogget;
}

function redirectUrlUtenSideParam(req: NextRequest) {
    // @ts-ignore
    const pattern = new URLPattern({ pathname: '*/skjema/:side/' });
    if (pattern.exec(req.url) === null) {
        const url = req.nextUrl.clone();
        url.pathname = '/skjema/0';
        return NextResponse.redirect(url);
    }
}

function isStaticFileRequest(req: NextRequest) {
    return /\/_next\/static\/(.*)\.(css|js)/.test(req.url);
}

export function middleware(req: NextRequest) {
    if (isStaticFileRequest(req)) {
        return;
    }

    if (shouldRedirectToLogin(req)) {
        const url = `${process.env.LOGINSERVICE_URL}?redirect=${process.env.NEXT_PUBLIC_START_URL}`;
        return NextResponse.redirect(url);
    }

    if (req.nextUrl.pathname.startsWith('/skjema')) {
        return redirectUrlUtenSideParam(req);
    }
}
