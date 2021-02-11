<template>
    <div class="ejn-todoList">
        <template v-if="list.length">
            <div class="todoList-container">
                <template v-for="todo in list">
                    <TodoItem
                        v-show="isVisibleTodo(todo)"
                        :key="todo.id"
                        :todo="todo"
                    />
                </template>
            </div>
        </template>
        <template v-else>
            <div class="todoList-empty">
                <span>👋 😀</span>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoItem from '@/components/todo/TodoItem.vue'
import { useTodoStore, CommitType, Todo } from '@/store/todo'
import { Visibility } from '@/libs/constant'

@Component({
    components: {
        TodoItem,
    },
})
export default class TodoList extends Vue {
    unsubscribeStore!: () => void

    get todoStore() {
        return useTodoStore(this.$store)
    }

    get isVisible() {
        const visibility = this.todoStore.state.completedTodoVisibility

        return visibility === Visibility.Visible
    }

    get isVisibleTodo() {
        return (todo: Todo) => {
            if (this.isVisible || todo.completedMs === 0) {
                return true
            }
            return false
        }
    }

    get list() {
        return this.todoStore.sortedList
    }

    mounted() {
        this.unsubscribeStore = this.$store.subscribe((mutation) => {
            if (mutation.type === CommitType.TODO_APPEND) {
                this.$el.scroll(0, 0)
            }
        })
    }

    beforeDestroy() {
        this.unsubscribeStore?.()
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

@keyframes hello {
    0% {
        transform: rotate(0deg) translateY(0px);
    }
    50% {
        transform: rotate(15deg) translateY(-10px);
    }
    100% {
        transform: rotate(0deg) translateY(0px);
    }
}

.ejn-todoList {
    overflow: auto;

    .todoList-container {
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-end;
        margin: 0.5rem 0 1.25rem;

        .ejn-todoItem {
            margin: 0.75rem 0.75rem 0;
        }
    }

    .todoList-empty {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            font-weight: 500;
            font-size: 64px;
            animation-name: hello;
            animation-iteration-count: infinite;
            animation-duration: 1.25s;
            animation-timing-function: linear;
        }
    }
}
</style>
