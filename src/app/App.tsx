import "../features/ todolists/ui/Todolists/Todolist/TodolistTitle/TodolistTitle.module.css"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
import React, {useEffect, useState} from "react"
import {Header} from "common/components/Header/Header"
import {useAppSelector} from "common/hooks/useAppSelector"
import {getTheme} from "common/theme/theme"
import {ErrorSnackbar} from "common/components";
import {Outlet} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import s from "./App.module.css"
import {selectThemeMode, setIsLoggedIn} from "app/appSlice";
import {useMeQuery} from "../features/auth/api/authApi";
import {ResultCode} from "common/enums";
import {useAppDispatch} from "common/hooks/useAppDispatch";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode) // текущее значение темы из Redux Store

    const [isInitialized, setIsInitialized] = useState(false)

    const dispatch = useAppDispatch()

    const { data, isLoading } = useMeQuery()

    useEffect(() => {
        if (!isLoading) {
            setIsInitialized(true)
            if (data?.resultCode === ResultCode.Success) {
                dispatch(setIsLoggedIn({ isLoggedIn: true }))
            }
        }
    }, [isLoading, data])

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline />
            {isInitialized && (
                <>
                    <Header />
                    <Outlet />
                </>
            )}
            {!isInitialized && (
                <div className={s.circularProgressContainer}>
                    <CircularProgress size={150} thickness={3} />
                </div>
            )}
            <ErrorSnackbar />
        </ThemeProvider>
    )
}
