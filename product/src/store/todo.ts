import { Module, Store } from 'vuex'
import {
    Order,
    orderInitialValue,
    Priority,
    priorityInitialValue,
    Visibility,
    visibilityInitialValue,
} from '@/libs/constant'
import { TodoConfigService } from '@/jsstore/todo-config/todo-config.service'
import { TodoListService } from '@/jsstore/todo-list/todo-list.service'

export interface Todo {
    id: number
    subject: string
    priority: string
    memo: string
    deadlineMs: number
    completedMs: number
    createdMs: number
}

export interface TodoPayload extends Partial<Omit<Todo, 'id'>> {
    id: number
}

export interface UpdateParams {
    id: number
    subject?: string
    priority?: string
    memo?: string
    deadlineMs?: number
    completed?: boolean
}

export interface TodoState {
    lastId: number
    list: Todo[]
    completedTodoVisibility: Visibility
    order: Order
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
})

export const todoModule: Module<TodoState, {}> = {
    state: defaultState,
    mutations: {
        [CommitType.TODO_SET_LAST_ID]: (state, nextId: number) => {
            state.lastId = nextId
        },
        [CommitType.TODO_SET_LIST]: (state, list: Todo[]) => {
            state.list = list
        },
        [CommitType.TODO_APPEND]: (state, todo: Todo) => {
            state.list.push(todo)
        },
        [CommitType.TODO_REMOVE]: (state, id: number) => {
            const index = getIndex(state, id)

            if (index === -1) {
                return
            }

            state.list.splice(index, 1)
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
    const todoConfigService = new TodoConfigService()
    const todoListService = new TodoListService()

    return {
        state,
        get sortedList() {
            return store.getters[GetterKey.TODO_SORTED_LIST]
        },
        setLastId(nextId: number) {
            if (typeof nextId !== 'number') {
                return
            }

            todoConfigService.setConfig({ lastId: nextId })

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

            const lastIndex = state.list.length - 1
            const lastTodo = state.list[lastIndex]
            const lastId = Math.max(state.lastId, lastTodo?.id || 0)

            nextTodo.id = lastId + 1
            nextTodo.createdMs = Date.now()

            todoListService.append(nextTodo as Todo)

            this.setLastId(nextTodo.id)

            store.commit(CommitType.TODO_APPEND, nextTodo)

            return todo
        },
        remove(id: number) {
            todoListService.remove(id)

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

            todoListService.update(payload)

            store.commit(CommitType.TODO_UPDATE, payload)
        },
        setCompletedTodoVisibility(visibility: Visibility) {
            const commitType = CommitType.TODO_SET_COMPLETED_JOB_VISIBILITY

            todoConfigService.setConfig({ completedTodoVisibility: visibility })

            store.commit(commitType, visibility)
        },
        setOrder(order: Order) {
            todoConfigService.setConfig({ order })

            store.commit(CommitType.TODO_SET_ORDER, order)
        },
    }
}

function getIndex(state: TodoState, id: number) {
    return state.list.findIndex((todo) => todo.id === id)
}
