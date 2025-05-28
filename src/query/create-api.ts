import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApplicationState } from '~/store/configure-store';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as ApplicationState).app.token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: () => ({}),
});
