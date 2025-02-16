import {BaseResponse} from "common/types";
import {instance} from "common/instance/instance";
import {baseApi} from "app/baseApi";
import {Inputs} from "../../ todolists/lib/hooks/useLogin";

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
    }),
})

export const {
    useMeQuery,
    useLoginMutation,
    useLogoutMutation
} = authApi

export const _authApi = {
    login(payload: Inputs) {
        return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload)
    },
    logout() {
        return instance.delete<BaseResponse>('auth/login')
    },
    me() {
        return instance.get<BaseResponse<{ id: number; email: string; login: string }>>('auth/me')
    },
}