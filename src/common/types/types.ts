import { FieldError } from "../../features/ todolists/api/todolistsApi.types"

export type BaseResponse<T = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: T
}
