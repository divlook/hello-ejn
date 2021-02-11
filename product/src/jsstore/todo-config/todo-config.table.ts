import { DATA_TYPE, ITable } from 'jsstore'

export const TodoConfigTable: ITable = {
    name: 'TodoConfig',
    columns: {
        key: {
            primaryKey: true,
            dataType: DATA_TYPE.String,
        },

        value: {
            notNull: true,
        },
    },
}
