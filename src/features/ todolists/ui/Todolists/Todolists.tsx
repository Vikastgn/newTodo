import * as React from "react"
import Paper from "@mui/material/Paper"
import {Todolist} from "./Todolist/Todolist"
import Grid from "@mui/material/Grid2"
import {useGetTodolistsQuery} from "../../api/todolistsApi";
import {TodolistSkeleton} from "../skeletons/TodolistSkeleton/TodolistSkeleton";


export const Todolists = () => {

  //const todolists = useAppSelector(selectTodolists) //  Это функция-селектор, которая принимает текущее состояние state и возвращает объект todolists. Таким образом, переменная todolists будет содержать данные о всех ваших списках задач.

    const { data: todolists, isLoading } = useGetTodolistsQuery()

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '32px' }}>
                {Array(3)
                    .fill(null)
                    .map((_, id) => (
                        <TodolistSkeleton key={id} />
                    ))}
            </div>
        )
    }

  return (
      <>

        {todolists?.map((tl) => {
          return (
              <Grid key={tl.id}>
                <Paper sx={{p: "0 20px 20px 20px"}}>
                  <Todolist todolist={tl}/>
                </Paper>
              </Grid>
          )
        })}
      </>
  )
}
