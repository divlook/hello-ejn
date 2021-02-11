import { Module, Store } from 'vuex'
import {
    Order,
    orderInitialValue,
    Priority,
    priorityInitialValue,
    Visibility,
    visibilityInitialValue,
} from '@/libs/constant'
export interface Todo {
    id: number
    subject: string
    priority: string
    memo: string
    deadlineMs: number
    completedMs: number
    createdMs: number
}

interface TodoPayload extends Partial<Omit<Todo, 'id'>> {
    id: number
}

interface UpdateParams {
    id: number
    subject?: string
    priority?: string
    memo?: string
    deadlineMs?: number
    completed?: boolean
}

interface TodoState {
    lastId: number
    list: Todo[]
    completedTodoVisibility: Visibility
    order: Order
    indexing: Map<number, number>
}

export const enum CommitType {
    TODO_SET_LAST_ID = 'TODO_SET_LAST_ID',
    TODO_SET_LIST = 'TODO_SET_LIST',
    TODO_APPEND = 'TODO_APPEND',
    TODO_REMOVE = 'TODO_REMOVE',
    TODO_UPDATE = 'TODO_UPDATE',
    TODO_SET_COMPLETED_JOB_VISIBILITY = 'TODO_SET_COMPLETED_JOB_VISIBILITY',
    TODO_SET_ORDER = 'TODO_SET_ORDER',
}

export const enum GetterKey {
    TODO_SORTED_LIST = 'TODO_SORTED_LIST',
    TODO_SORTED_LIST_BY_DEADLINE = 'TODO_SORTED_LIST_BY_DEADLINE',
    TODO_SORTED_LIST_BY_PRIORITY = 'TODO_SORTED_LIST_BY_PRIORITY',
}

const defaultState = (): TodoState => ({
    lastId: 0,
    list: [],
    completedTodoVisibility: visibilityInitialValue,
    order: orderInitialValue,
    indexing: new Map(),
})

export const todoModule: Module<TodoState, {}> = {
    state: defaultState,
    mutations: {
        [CommitType.TODO_SET_LAST_ID]: (state, nextId: number) => {
            state.lastId = nextId
        },
        [CommitType.TODO_SET_LIST]: (state, list: Todo[]) => {
            state.list = list
            state.indexing.clear()
            list.forEach((todo, index) => state.indexing.set(todo.id, index))
        },
        [CommitType.TODO_APPEND]: (state, todo: Todo) => {
            state.indexing.set(todo.id, state.list.length)
            state.list.push(todo)
        },
        [CommitType.TODO_REMOVE]: (state, id: number) => {
            const index = getIndex(state, id)

            if (index === -1) {
                return
            }

            const todo = state.list[index]

            state.list.splice(index, 1)
            state.indexing.delete(todo.id)
        },
        [CommitType.TODO_UPDATE]: (state, todo: TodoPayload) => {
            const index = getIndex(state, todo.id)

            if (index === -1) {
                return
            }

            const prevTodo = state.list[index]

            Object.assign(prevTodo, todo)
        },
        [CommitType.TODO_SET_COMPLETED_JOB_VISIBILITY]: (state, visibility) => {
            state.completedTodoVisibility = visibility
        },
        [CommitType.TODO_SET_ORDER]: (state, order) => {
            state.order = order
        },
    },
    getters: {
        [GetterKey.TODO_SORTED_LIST]: (state, getters) => {
            switch (state.order) {
                case Order.Deadline:
                    return getters[GetterKey.TODO_SORTED_LIST_BY_DEADLINE]

                case Order.Priority:
                    return getters[GetterKey.TODO_SORTED_LIST_BY_PRIORITY]

                default:
                    return state.list
            }
        },
        [GetterKey.TODO_SORTED_LIST_BY_DEADLINE]: (state) => {
            const nextList: Todo[] = []

            return nextList.concat(state.list).sort((a, b) => {
                if (a.deadlineMs === 0) return -1
                if (b.deadlineMs === 0) return 1
                return b.deadlineMs - a.deadlineMs
            })
        },
        [GetterKey.TODO_SORTED_LIST_BY_PRIORITY]: (state) => {
            const nextList: Todo[] = []

            return nextList.concat(state.list).sort((a, b) => {
                if (a.priority === Priority.Low) return -1
                if (b.priority === Priority.Low) return 1

                if (a.priority === Priority.Medium) return -1
                if (b.priority === Priority.Medium) return 1

                return 0
            })
        },
    },
}

export const useTodoStore = (store: Store<any>) => {
    const state: TodoState = store.state.todo

    return {
        state,
        get sortedList() {
            return store.getters[GetterKey.TODO_SORTED_LIST]
        },
        setLastId(nextId: number) {
            if (typeof nextId !== 'number') {
                return
            }

            if (nextId < 0) {
                nextId = 0
            }

            store.commit(CommitType.TODO_SET_LAST_ID, nextId)
        },
        setList(list: Todo[]) {
            if (Array.isArray(list)) {
                store.commit(CommitType.TODO_SET_LIST, list)
            }
        },
        append(todo: Partial<Todo>) {
            if (!todo.subject) {
                return
            }

            const nextTodo = {
                ...todo,
            }

            if (!nextTodo.priority) {
                nextTodo.priority = priorityInitialValue
            }

            if (!nextTodo.memo) {
                nextTodo.memo = ''
            }

            if (!nextTodo.deadlineMs) {
                nextTodo.deadlineMs = 0
            }

            if (!nextTodo.completedMs) {
                nextTodo.completedMs = 0
            }

            nextTodo.id = state.lastId + 1
            nextTodo.createdMs = Date.now()

            store.commit(CommitType.TODO_SET_LAST_ID, nextTodo.id)
            store.commit(CommitType.TODO_APPEND, nextTodo)

            return todo
        },
        remove(id: number) {
            store.commit(CommitType.TODO_REMOVE, id)
        },
        update(params: UpdateParams) {
            const payload: TodoPayload = {
                id: params.id,
            }

            if (typeof params?.subject === 'string') {
                payload.subject = params.subject
            }

            if (typeof params?.priority === 'string') {
                payload.priority = params.priority
            }

            if (typeof params?.memo === 'string') {
                payload.memo = params.memo
            }

            if (typeof params?.deadlineMs === 'number') {
                payload.deadlineMs = params.deadlineMs
            }

            if (typeof params?.completed === 'boolean') {
                payload.completedMs = params.completed ? Date.now() : 0
            }

            store.commit(CommitType.TODO_UPDATE, payload)
        },
        setCompletedTodoVisibility(visibility: Visibility) {
            store.commit(
                CommitType.TODO_SET_COMPLETED_JOB_VISIBILITY,
                visibility
            )
        },
        setOrder(order: Order) {
            store.commit(CommitType.TODO_SET_ORDER, order)
        },
    }
}

function getIndex(state: TodoState, id: number) {
    let index = state.indexing.get(id)

    if (!index) {
        index = state.list.findIndex((todo) => todo.id === id)
    }

    return index ?? -1
}
