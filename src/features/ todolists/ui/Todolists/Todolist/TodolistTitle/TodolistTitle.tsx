import * as React from "react"
import {EditableSpan} from "common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import {todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation} from "../../../../api/todolistsApi";
import {RequestStatus} from "app/appSlice";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {DomainTodolist} from "../../../../lib/types/types";

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {title, id, entityStatus} = todolist
    const dispatch = useAppDispatch()
    const updateQueryData = (status: RequestStatus) => {
        dispatch(
            todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
                const index = state.findIndex(tl => tl.id === id)
                if (index !== -1) {
                    state[index].entityStatus = status
                }
            })
        )
    }

    const [removeTodolist] = useRemoveTodolistMutation()

    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

    const removeTodolistHandler = () => {
        updateQueryData('loading')
        removeTodolist(id)
            .unwrap()
            .catch(() => {
                updateQueryData('idle')
            })
    }


    const updateTodolistHandler = (title: string) => {
        updateTodolistTitle({id, title})
    }

    return (
        <div className={"todolist-title-container"}>
            <h3>
                <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === 'loading'}/>
            </h3>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
