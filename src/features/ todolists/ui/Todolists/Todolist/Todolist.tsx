import {AddItemForm} from "common/components/AddItemForm/AddItemForm"
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons"
import {Tasks} from "./Tasks/Tasks"
import {TodolistTitle} from "./TodolistTitle/TodolistTitle"
import {useAddTaskMutation} from "../../../api/tasksApi";
import {DomainTodolist} from "../../../lib/types/types";

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
 const [addTask] = useAddTaskMutation()

  const addTaskCallback = (title: string) => {
    addTask({ title, todolistId: todolist.id })
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
