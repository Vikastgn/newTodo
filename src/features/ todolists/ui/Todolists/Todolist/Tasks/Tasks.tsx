import * as React from "react"
import List from "@mui/material/List"
import {Task} from "./Task/Task"
import {TaskStatus} from "common/enums"
import {useGetTasksQuery} from "../../../../api/tasksApi";
import {TasksSkeleton} from "../../../skeletons/TasksSkeleton/TasksSkeleton";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {useEffect, useState} from "react";
import {setAppError} from "app/appSlice";
import {TasksPagination} from "../TasksPagination/TasksPagination";
import {DomainTodolist} from "../../../../lib/types/types";
import {useTasks} from "../../../../lib/hooks/useTasks";

type Props = {
  todolist: DomainTodolist
}
type ErrorData = {
  status: number
  data: {
    message: string
  }
}

export const Tasks = ({ todolist }: Props) => {
  const { tasks, isLoading, totalCount, page, setPage } = useTasks(todolist)

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
      <>
        {tasks?.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <>
              <List>
                {tasks?.map(task => {
                  return <Task key={task.id} task={task} todolist={todolist} />
                })}
              </List>
              <TasksPagination totalCount={totalCount || 0} page={page} setPage={setPage} />
            </>
        )}
      </>
  )
}