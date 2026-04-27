import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

import en from "../language/en";
import it from "../language/it";

const messages: any = {
    en,
    it,
};


export default getRequestConfig(async () => {
    const cookieStore = await cookies();

    let locale = cookieStore.get('NEXT_LOCALE')?.value || "en";

    if (cookieStore.get('request-pathname')?.value === "admin") {
        locale = "en";
    }

    return {
        locale,
        messages: messages[locale] || messages.en,
    };
});