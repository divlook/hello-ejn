import { connection } from '@/jsstore/connection'
import { TodoListTable } from '@/jsstore/todo-list/todo-list.table'
import { Todo, TodoPayload } from '@/store/todo'

export class TodoListService {
    tableName: string

    constructor() {
        this.tableName = TodoListTable.name
    }

    getAll() {
        return connection.select<Todo>({
            from: this.tableName,
        })
    }

    insertAll(list: Todo[]) {
        return connection.insert({
            into: this.tableName,
            values: list,
        })
    }

    append(todo: Todo) {
        return connection.insert({
            into: this.tableName,
            values: [todo],
        })
    }

    remove(id: number) {
        return connection.remove({
            from: this.tableName,
            where: {
                id,
            },
        })
    }

    update(payload: TodoPayload) {
        return connection.update({
            in: this.tableName,
            set: {
                ...payload,
            },
            where: {
                id: payload.id,
            },
        })
    }
}
