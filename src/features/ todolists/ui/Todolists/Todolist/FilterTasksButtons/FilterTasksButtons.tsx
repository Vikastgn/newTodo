import * as React from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { filterButtonsContainerSx } from "./FilterTasksButtons.styles"
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {todolistsApi} from "../../../../api/todolistsApi";
import {DomainTodolist, FilterValues} from "../../../../lib/types/types";

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
    const { filter, id } = todolist

    const dispatch = useAppDispatch()

    const changeFilterTasksHandler = (filter: FilterValues) => {
        dispatch(
            todolistsApi.util.updateQueryData(
                // 1 имя запроса, который вы хотите обновить, в данном случае 'getTodolists'
                'getTodolists',
                // 2  переменные, если они есть (в данном случае undefined, так как мы обновляем все списки)
                undefined,
                // 3 функция, которая принимает текущее состояние (в данном случае это массив списков дел) и обновляет его.
                state => {
                    const index = state.findIndex(tl => tl.id === id)
                    if (index !== -1) {
                        state[index].filter = filter
                    }
                }
            )
        )
    }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text" }
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
