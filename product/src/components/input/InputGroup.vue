<template>
    <div
        class="ejn-inputGroup"
        :class="{
            'ejn-inputGroup-large': large,
        }"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class InputGroup extends Vue {
    @Prop({
        type: Boolean,
        default: false,
    })
    readonly large!: boolean
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-inputGroup {
    background: $color-medium-purple;
    font-size: 14px;
    color: $color-white;
    display: inline-flex;
    border-radius: 4px;
    border: 1px solid $color-purple-heart;
    box-sizing: border-box;
    height: 28px;

    > * {
        border-radius: 0 !important;
        border: 0 !important;
        border-right: 1px solid $color-purple-heart !important;
        height: 26px !important;
    }

    > *:first-child {
        border-top-left-radius: 4px !important;
        border-bottom-left-radius: 4px !important;
    }

    > *:last-child {
        border-top-right-radius: 4px !important;
        border-bottom-right-radius: 4px !important;
        border-right: 0 !important;
    }

    > .label,
    > .text {
        padding: 0 8px;
        line-height: $line-height;
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
    }

    > .text {
        background-color: $color-white;
        color: $color-black;
    }

    &.ejn-inputGroup-large {
        height: 36px;

        > * {
            height: 34px !important;
        }
    }
}
</style>
