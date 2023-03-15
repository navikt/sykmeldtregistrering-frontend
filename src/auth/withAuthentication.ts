import { GetServerSidePropsContext, GetServerSidePropsResult, NextPageContext } from 'next';
import { validateIdportenToken } from '@navikt/next-auth-wonderwall';
import { logger } from '@sentry/utils';

type PageHandler = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<unknown>>;

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will automatically redirect to login if
 * Wonderwall-cookie is missing.
 *
 */
export function withAuthenticatedPage(handler: PageHandler = async () => ({ props: {} })) {
    return async function withBearerTokenHandler(
        context: GetServerSidePropsContext
    ): Promise<ReturnType<NonNullable<typeof handler>>> {
        const brukerMock = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'enabled';

        if (brukerMock) {
            return handler(context);
        }

        const request = context.req;

        const bearerToken: string | null | undefined = request.headers['authorization'];
        if (!bearerToken) {
            return {
                redirect: {
                    destination: `/oauth2/login?redirect=${process.env.NEXT_PUBLIC_START_URL}`,
                    permanent: false,
                },
            };
        }

        const validationResult = await validateIdportenToken(bearerToken);
        if (validationResult !== 'valid') {
            logger.error(
                new Error(
                    `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.message}, redirecting to login.`,
                    { cause: validationResult.error }
                )
            );
            return {
                redirect: {
                    destination: `/oauth2/login?redirect=${process.env.NEXT_PUBLIC_START_URL}`,
                    permanent: false,
                },
            };
        }

        return handler(context);
    };
}
