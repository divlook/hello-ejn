<template>
    <div class="ejn-todo"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Todo extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-todo {
    background-color: $color-concrete;
    width: 100%;
    height: 100%;
    min-width: 300px;
    box-shadow: 0 2px 6px rgba($color: #000, $alpha: 0.2);
    border-radius: 4px;
}

@media (min-width: 720px) {
    .ejn-todo {
        width: 720px;
        height: 80%;
    }
}
</style>
