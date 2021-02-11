import { Module, Store } from 'vuex'

interface MemoState {
    show: boolean
    memo: string
    callback: (value: string) => void
}

interface ShowModalPayload extends Pick<MemoState, 'memo' | 'callback'> {}

const enum CommitType {
    MEMO_SHOW_MODAL = 'MEMO_SHOW_MODAL',
    MEMO_HIDE_MODAL = 'MEMO_HIDE_MODAL',
}

const defaultState = (): MemoState => ({
    show: false,
    memo: '',
    callback: () => null,
})

export const memoModule: Module<MemoState, {}> = {
    state: defaultState,
    mutations: {
        [CommitType.MEMO_SHOW_MODAL]: (state, payload: ShowModalPayload) => {
            state.show = true
            state.memo = payload.memo
            state.callback = payload.callback
        },
        [CommitType.MEMO_HIDE_MODAL]: (state) => {
            Object.assign(state, defaultState())
        },
    },
    actions: {},
}

export const useMemoStore = (store: Store<any>) => {
    const state: MemoState = store.state.memo

    return {
        state,
        showModal(payload: ShowModalPayload) {
            if (!payload.memo || typeof payload.memo !== 'string') {
                payload.memo = ''
            }

            if (typeof payload.callback !== 'function') {
                return
            }

            store.commit(CommitType.MEMO_SHOW_MODAL, payload)
        },
        hideModal() {
            store.commit(CommitType.MEMO_HIDE_MODAL)
        },
        save(value: string) {
            if (typeof state.callback === 'function') {
                state.callback(value)
            }

            store.commit(CommitType.MEMO_HIDE_MODAL)
        },
    }
}
