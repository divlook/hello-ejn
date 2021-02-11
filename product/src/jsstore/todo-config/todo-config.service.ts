import { connection } from '@/jsstore/connection'
import { TodoConfigTable } from '@/jsstore/todo-config/todo-config.table'
import { TodoState } from '@/store/todo'

interface Config
    extends Pick<TodoState, 'lastId' | 'completedTodoVisibility' | 'order'> {}

export class TodoConfigService {
    tableName: string

    constructor() {
        this.tableName = TodoConfigTable.name
    }

    async getConfig() {
        const configs = await connection.select({
            from: this.tableName,
        })

        if (configs.length === 0) return null

        return configs.reduce((obj: any, config: any) => {
            obj[config.key] = config.value
            return obj
        }, {}) as Config
    }

    setConfig(config: Partial<Config>) {
        const values = Object.keys(config).map((key) => {
            const value = config[key as keyof Config]

            return {
                key,
                value,
            }
        })

        return connection.insert({
            into: this.tableName,
            values,
            upsert: true,
            skipDataCheck: true,
        })
    }
}
