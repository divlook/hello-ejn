<template>
    <button
        :type="type"
        class="ejn-btn"
        :class="[`ejn-btn-${color || 'default'}`]"
        @click.stop="onClick"
    >
        <slot />
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Btn extends Vue {
    @Prop()
    readonly color!: 'default' | 'primary' | 'danger'

    @Prop({
        default: 'button',
    })
    readonly type!: 'button' | 'submit'

    onClick(e: any) {
        this.$emit('click', e)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-btn {
    border: 0;
    padding: 0 8px;
    margin: 0;
    font-size: 14px;
    line-height: $line-height;
    border-radius: 4px;
    height: 28px;
    box-sizing: border-box;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }

    &.ejn-btn-default {
        background: $color-concrete;
        color: $color-black;
        border: 1px solid $color-silver;
        &:disabled {
            color: rgba($color: $color-black, $alpha: 0.4);
        }
    }

    &.ejn-btn-primary {
        background: $color-electric-violet;
        color: $color-white;
        &:disabled {
            background: $color-medium-purple;
            color: rgba($color: $color-white, $alpha: 0.4);
        }
    }

    &.ejn-btn-danger {
        background: $color-pomegranate;
        color: $color-white;
        &:disabled {
            opacity: 0.65;
        }
    }
}
</style>
