<template>
    <main class="ejn-app">
        <Todo />
    </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Todo from '@/components/Todo.vue'

@Component({
    components: {
        Todo,
    },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-app {
    width: 100%;
    height: 100%;
    min-height: 720px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
