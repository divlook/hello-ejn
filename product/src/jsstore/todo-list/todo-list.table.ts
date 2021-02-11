import { DATA_TYPE, ITable } from 'jsstore'
import { priorityInitialValue } from '@/libs/constant'

export const TodoListTable: ITable = {
    name: 'TodoList',
    columns: {
        id: {
            primaryKey: true,
            dataType: DATA_TYPE.Number,
        },

        subject: {
            notNull: true,
            dataType: DATA_TYPE.String,
        },

        priority: {
            dataType: DATA_TYPE.String,
            default: priorityInitialValue,
        },

        memo: {
            dataType: DATA_TYPE.String,
            default: '',
        },

        deadlineMs: {
            dataType: DATA_TYPE.Number,
            default: 0,
        },

        completedMs: {
            dataType: DATA_TYPE.Number,
            default: 0,
        },

        createdMs: {
            notNull: true,
            dataType: DATA_TYPE.Number,
        },
    },
}
