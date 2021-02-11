import Vue from 'vue'
import Vuex from 'vuex'
import { selectModule } from '@/store/select'
import { memoModule } from '@/store/memo'
import { todoModule } from '@/store/todo'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    modules: {
        select: selectModule,
        memo: memoModule,
        todo: todoModule,
    },
})
