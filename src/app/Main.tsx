import Grid from "@mui/material/Grid2"
import {AddItemForm} from "common/components/AddItemForm/AddItemForm"
import Container from "@mui/material/Container"
import React from "react"
import {Todolists} from "../features/ todolists/ui/Todolists/Todolists"
import {useAppSelector} from "common/hooks/useAppSelector";
import {Navigate} from "react-router-dom";
import {Path} from "common/router/router";
import {useAddTodolistMutation} from "../features/ todolists/api/todolistsApi";
import {selectIsLoggedIn} from "app/appSlice";


export const Main = () => {
    const [addTodolist] = useAddTodolistMutation()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const addTodolistCallback = (title: string) => {
        addTodolist(title)
    }
    if (!isLoggedIn) {
        return <Navigate to={Path.Login} />
    }
    return (
        <Container fixed>
            <Grid container sx={{mb: "30px"}}>
                <AddItemForm addItem={ addTodolistCallback}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    )
}
