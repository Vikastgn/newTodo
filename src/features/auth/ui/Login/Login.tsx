import {useLogin} from "../../../ todolists/lib/hooks/useLogin";
import {Navigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {FormControl, FormLabel} from "@mui/material";
import {LoginFormLabel} from "../LoginFormLabel/LoginFormLabel";
import {LoginForm} from "../LoginFormLabel/LoginForm";
import React from "react";

export const Login = () => {
    const { isLoggedIn } = useLogin()

    if (isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel>
                        <LoginFormLabel />
                        <LoginForm />
                    </FormLabel>
                </FormControl>
            </Grid>
        </Grid>
    )
}