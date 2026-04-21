import { getRequestConfig } from 'next-intl/server';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'it'],
    defaultLocale: 'en',
    localePrefix: "always",
});

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`./language/${locale}/index.ts`)).default,
    };
});