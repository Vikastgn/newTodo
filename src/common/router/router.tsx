import {Login} from "../../features/auth/ui/Login/Login";
import {Main} from "app/Main";
import {App} from "app/App";
import {createBrowserRouter} from "react-router-dom";
import {Page404} from "common/components";

export const Path = {
    Main: '/',
    Login: 'login',
} as const

export const router = createBrowserRouter([
    {
        path: Path.Main,
        element: <App />,
        children: [
            {
                path: Path.Main,
                element: <Main />,
            },
            {
                path: Path.Login,
                element: <Login />,
            },
            {
                path: '*',
                element: <Page404 />,
            },
        ],
    },
])