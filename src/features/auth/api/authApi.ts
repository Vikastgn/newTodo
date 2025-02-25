import {BaseResponse} from "common/types";
import {baseApi} from "app/baseApi";
import {Inputs} from "../../ todolists/lib/hooks/useLogin";
import {CaptchaResponse} from "./authApi.types";

export const authApi = baseApi.injectEndpoints({
    endpoints: build => ({
        me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
            query: () => 'auth/me',
        }),
        login: build.mutation<BaseResponse<{ userId: number; token: string }>, Inputs>({
            query: payload => {
                return {
                    method: 'POST',
                    url: 'auth/login',
                    body: payload,
                }
            },
        }),
        logout: build.mutation<BaseResponse, void>({
            query: () => {
                return {
                    method: 'DELETE',
                    url: 'auth/login',
                }
            },
        }),
        getCaptchaUrl: build.query<CaptchaResponse, void>({
            query: () => {
                return{
                    method: 'GET',
                    url: 'security/get-captcha-url',
                }
            }
        }),

    }),
})

export const {
    useMeQuery,
    useLoginMutation,
    useLogoutMutation,
    useLazyGetCaptchaUrlQuery,
} = authApi

