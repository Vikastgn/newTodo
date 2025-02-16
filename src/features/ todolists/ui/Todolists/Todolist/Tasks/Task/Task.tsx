import * as React from "react"
import {ChangeEvent} from "react"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import {getListItemSx} from "../Task.styles"
import {EditableSpan} from "common/components"
import {DomainTask} from "../../../../../api/tasksApi.types"
import {TaskStatus} from "common/enums"
import {useRemoveTaskMutation, useUpdateTaskMutation} from "../../../../../api/tasksApi";
import {createTaskModel} from "../../../../../lib/utils/createTaskModel";
import {DomainTodolist} from "../../../../../lib/types/types";

type Props = {
    task: DomainTask
    todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
    const [removeTask] = useRemoveTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const removeTaskHandler = () => {
        removeTask({ taskId: task.id, todolistId: todolist.id })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        const model = createTaskModel(task, { status })
        updateTask({ taskId: task.id, todolistId: todolist.id, model })
    }

    const changeTaskTitleHandler = (title: string) => {
        const model = createTaskModel(task, { title })
        updateTask({ taskId: task.id, todolistId: todolist.id, model })
    }

    const disabled = todolist.entityStatus === "loading"

    return (
        <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
            <div>
                <Checkbox
                    checked={task.status === TaskStatus.Completed}
                    onChange={changeTaskStatusHandler}
                    disabled={disabled}
                />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={disabled} />
            </div>
            <IconButton onClick={removeTaskHandler} disabled={disabled}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}
