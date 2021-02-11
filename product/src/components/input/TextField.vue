<template>
    <div class="ejn-textField">
        <input
            ref="input"
            type="text"
            :value="value"
            :placeholder="placeholder"
            :readonly="readonly"
            :required="required"
            @input="onInput"
            @keypress.enter="onEnter"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'

@Component
export default class TextField extends Vue {
    @Ref('input')
    readonly inputRef!: HTMLInputElement

    @Prop({
        type: String,
        default: 'text',
    })
    readonly type!: 'text'

    @Prop({
        type: String,
        default: '',
    })
    readonly value!: string

    @Prop()
    readonly placeholder!: string

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly readonly!: boolean

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly required!: boolean

    focus() {
        this.inputRef?.focus()
    }

    onInput(e: any) {
        const val = e?.target?.value ?? ''

        /**
         * @event input
         */
        this.$emit('input', val)
    }

    onEnter(e: any) {
        /**
         * @event enter
         */
        this.$emit('enter', e)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-textField {
    display: inline-flex;
    height: 28px;
    box-sizing: border-box;
    border: 1px solid $color-purple-heart;
    border-radius: 4px;
    background: $color-white;

    input {
        display: block;
        border: 0;
        border-radius: 4px;
        background: transparent;
        padding: 0 8px;
        color: $color-black;
        font-size: 12px;
        line-height: $line-height;
        width: 100%;
        height: inherit;
        box-sizing: border-box;

        &:read-only {
            background-color: rgba($color: $color-concrete, $alpha: 0.5);
        }
    }
}
</style>
