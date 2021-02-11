<template>
    <div class="ejn-todoHeader">
        <div class="todoHeader-container pt-2 px-2">
            <Tabs
                :value="completedTodoVisibility"
                label="완료된 작업"
                :option="visibilityLabels"
                @input="setCompletedTodoVisibility"
            />

            <Tabs
                :value="order"
                label="정렬"
                :option="orderLabels"
                @input="setOrder"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tabs from '@/components/input/Tabs.vue'
import {
    Order,
    orderLabels,
    Visibility,
    visibilityLabels,
} from '@/libs/constant'
import { useTodoStore } from '@/store/todo'

@Component({
    components: {
        Tabs,
    },
})
export default class TodoHeader extends Vue {
    get todoStore() {
        return useTodoStore(this.$store)
    }

    get completedTodoVisibility() {
        return this.todoStore.state.completedTodoVisibility
    }

    get order() {
        return this.todoStore.state.order
    }

    get visibilityLabels() {
        return visibilityLabels
    }

    get orderLabels() {
        return orderLabels
    }

    setCompletedTodoVisibility(visibility: Visibility) {
        this.todoStore.setCompletedTodoVisibility(visibility)
    }

    setOrder(order: Order) {
        this.todoStore.setOrder(order)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-todoHeader {
    background-color: $color-white;
    box-shadow: 0 0 10px rgba($color: $color-black, $alpha: 0.2);

    .todoHeader-container {
        text-align: right;

        > * {
            margin-left: 0.5rem;
            margin-bottom: 0.5rem;

            &:first-child {
                margin-left: 0;
            }
        }
    }
}
</style>
