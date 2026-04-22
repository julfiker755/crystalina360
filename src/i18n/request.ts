import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

import en from "../language/en";
import it from "../language/it";

const messages: any = {
    en,
    it,
};


export default getRequestConfig(async () => {
    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'it';

    return {
        locale,
        messages: messages[locale],
    };
});