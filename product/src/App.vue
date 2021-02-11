<template>
    <div class="ejn-app">
        <Todo />
        <SelectModal />
        <MemoModal />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Todo from '@/components/todo/Todo.vue'
import SelectModal from '@/components/modal/SelectModal.vue'
import MemoModal from '@/components/modal/MemoModal.vue'
import { initJsStore } from '@/jsstore'
import { useTodoStore } from '@/store/todo'
import { TodoConfigService } from '@/jsstore/todo-config/todo-config.service'
import { TodoListService } from '@/jsstore/todo-list/todo-list.service'

@Component({
    components: {
        Todo,
        SelectModal,
        MemoModal,
    },
})
export default class App extends Vue {
    todoConfigService = new TodoConfigService()
    todoListService = new TodoListService()

    get todoStore() {
        return useTodoStore(this.$store)
    }

    beforeCreate() {
        initJsStore()
    }

    created() {
        this.initTodoService()
    }

    async initTodoService() {
        try {
            const config = await this.todoConfigService.getConfig()

            if (config) {
                if (config.lastId) {
                    this.todoStore.setLastId(config.lastId)
                }

                if (config.completedTodoVisibility) {
                    const visibility = config.completedTodoVisibility
                    this.todoStore.setCompletedTodoVisibility(visibility)
                }

                if (config.order) {
                    this.todoStore.setOrder(config.order)
                }
            }

            const todoList = await this.todoListService.getAll()

            if (todoList.length) {
                this.todoStore.setList(todoList)
            }
        } catch (error) {
            console.error(error)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-app {
    width: 100%;
    height: 100%;
    min-height: 720px;
    background-color: $color-electric-violet;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
