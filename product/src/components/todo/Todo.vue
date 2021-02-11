<template>
    <main class="ejn-todo">
        <TodoHeader />
        <TodoList />
        <TodoFooter />
    </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoHeader from '@/components/todo/TodoHeader.vue'
import TodoList from '@/components/todo/TodoList.vue'
import TodoFooter from '@/components/todo/TodoFooter.vue'

@Component({
    components: {
        TodoHeader,
        TodoList,
        TodoFooter,
    },
})
export default class Todo extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-todo {
    background-color: $color-concrete;
    width: 100%;
    height: 100%;
    min-width: 300px;
    box-shadow: 0 2px 20px rgba($color: $color-black, $alpha: 0.2);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    z-index: 0;

    .ejn-todoHeader {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        position: relative;
        z-index: 1;
    }

    .ejn-todoFooter {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        position: relative;
        z-index: 1;
    }

    .ejn-todoList {
        flex: 1;
    }
}

@media (min-width: 720px) {
    .ejn-todo {
        width: 80%;
        max-width: 1024px;
        height: 80%;
    }
}
</style>
