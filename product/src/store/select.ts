import { Module, Store } from 'vuex'

interface SelectState {
    show: boolean
    option: (string | number)[]
    selectedValue?: string | number
    callback: (value: string | number) => void
}

interface ShowModalPayload extends Omit<SelectState, 'show'> {}

const enum CommitType {
    SELECT_SHOW_MODAL = 'SELECT_SHOW_MODAL',
    SELECT_HIDE_MODAL = 'SELECT_HIDE_MODAL',
}

const defaultState = (): SelectState => ({
    show: false,
    option: [],
    selectedValue: '',
    callback: () => null,
})

export const selectModule: Module<SelectState, {}> = {
    state: defaultState,
    mutations: {
        [CommitType.SELECT_SHOW_MODAL]: (state, payload: ShowModalPayload) => {
            state.show = true
            state.option = payload.option
            state.selectedValue = payload.selectedValue
            state.callback = payload.callback
        },
        [CommitType.SELECT_HIDE_MODAL]: (state) => {
            Object.assign(state, defaultState())
        },
    },
    actions: {},
}

export const useSelectStore = (store: Store<any>) => {
    const state: SelectState = store.state.select

    return {
        state,
        showModal(payload: ShowModalPayload) {
            if (payload.option.length === 0) {
                return
            }

            if (typeof payload.callback !== 'function') {
                return
            }

            if (payload?.selectedValue === null) {
                payload.selectedValue = ''
            }

            store.commit(CommitType.SELECT_SHOW_MODAL, payload)
        },
        hideModal() {
            store.commit(CommitType.SELECT_HIDE_MODAL)
        },
        confirm(value: string | number) {
            if (typeof state.callback === 'function') {
                state.callback(value)
            }

            store.commit(CommitType.SELECT_HIDE_MODAL)
        },
    }
}
