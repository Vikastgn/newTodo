import {getTheme} from "../../theme/theme"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Switch from "@mui/material/Switch"
import AppBar from "@mui/material/AppBar"
import React from "react"
import {useAppSelector} from "../../hooks/useAppSelector"
import {LinearProgress} from "@mui/material";
import {MenuButton} from "common/components";
import {changeTheme, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn} from "app/appSlice";
import {useLogoutMutation} from "../../../features/auth/api/authApi";
import {ResultCode} from "common/enums";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {baseApi} from "app/baseApi";

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode) // текущее значение темы из Redux Store
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectStatus)
    const theme = getTheme(themeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const [logout] = useLogoutMutation()

    const logoutHandler = () => {
        logout().then(res => {
            if (res.data?.resultCode === ResultCode.Success) {
                dispatch(setIsLoggedIn({ isLoggedIn: false }))
                localStorage.removeItem('sn-token')
            }
        })
            .then(() => {
                dispatch(baseApi.util.invalidateTags(['Task','Todolist']))
            })
    }
    const changeModeHandler = () => {
        dispatch(changeTheme({themeMode: themeMode === "light" ? "dark" : "light"})) //dispatch принимает action (то, что отдает AC)
        // Если текущая тема — светлая ("light"), то вы хотите переключить её на тёмную ("dark"). Если текущая тема — тёмная, вы переключаете её на светлую.
    }

    return (
        <AppBar position="static" sx={{mb: "30px"}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    )
}
