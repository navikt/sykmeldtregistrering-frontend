import { NextRequest, NextResponse } from 'next/server';

export default function redirectToLogin(req: NextRequest) {
    const { cookies } = req;
    const url = req.nextUrl.clone();
    const brukerMock = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'enabled';
    const erInnlogget = cookies['selvbetjening-idtoken'];
    const erForsiden = url.pathname === '/';

    if (erForsiden || brukerMock) {
        return;
    }

    if (!erInnlogget) {
        console.log(`${new Date()}: Bruker ikke innlogget. Vidersender til login`);
        const url = `${process.env.LOGINSERVICE_URL}?redirect=${process.env.NEXT_PUBLIC_START_URL}`;
        return NextResponse.redirect(url);
    }
}
