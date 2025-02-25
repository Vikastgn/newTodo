import {selectCaptchaUrl, selectIsLoggedIn, selectThemeMode, setCaptchaUrl, setIsLoggedIn} from "app/appSlice";
import {ResultCode} from "common/enums";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {useLazyGetCaptchaUrlQuery, useLoginMutation} from "../../../auth/api/authApi";
import {getTheme} from "common/theme/theme";
import {useAppSelector} from "common/hooks/useAppSelector";

export type Inputs = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export const useLogin = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const theme = getTheme(themeMode)
    const captchaUrl = useAppSelector(selectCaptchaUrl)
    const dispatch = useAppDispatch()

    const [login] = useLoginMutation()

    const [captcha, {data}] = useLazyGetCaptchaUrlQuery()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm<Inputs>({ defaultValues: { email: '', password: '', rememberMe: false, captcha: '' } })

    const onSubmit: SubmitHandler<Inputs> = data => {
        login(data)
            .then(res => {
                console.log(data)
                if (res.data?.resultCode === ResultCode.Success) {
                    dispatch(setIsLoggedIn({ isLoggedIn: true }))
                    localStorage.setItem('sn-token', res.data.data.token)
                }
                if (res.data?.resultCode === ResultCode.CaptchaError) {

                    captcha() // запрос за новой капчей
                        .then(res => {
                            dispatch(setCaptchaUrl({ captchaUrl: res.data?.url || null }));
                        });
                }
            })
            .finally(() => {
                reset()
            })
    }

    return { isLoggedIn, theme, handleSubmit, onSubmit, control, errors, register, captchaUrl }
}