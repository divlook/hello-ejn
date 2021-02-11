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

@Component({
    components: {
        Todo,
        SelectModal,
        MemoModal,
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
    background-color: $color-electric-violet;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
