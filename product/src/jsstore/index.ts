import { IDataBase } from 'jsstore'
import { connection } from '@/jsstore/connection'
import { TodoConfigTable } from '@/jsstore/todo-config/todo-config.table'
import { TodoListTable } from '@/jsstore/todo-list/todo-list.table'

const getDatabase = () => {
    const dataBase: IDataBase = {
        name: 'hello-ejn',
        tables: [TodoConfigTable, TodoListTable],
    }

    return dataBase
}

export const initJsStore = async () => {
    try {
        const dataBase = getDatabase()
        const isDbCreated = await connection.initDb(dataBase)

        if (isDbCreated) {
            console.log('db created')
        } else {
            console.log('db opened')
        }
    } catch (error) {
        console.error(error)
        return error
        // Global.isIndexedDbSupported = false
    }
}
