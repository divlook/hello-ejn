<template>
    <div class="ejn-textArea">
        <textarea
            ref="textarea"
            :value="value"
            :placeholder="placeholder"
            :readonly="readonly"
            :rows="rows"
            @input="onInput"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'

@Component
export default class TextArea extends Vue {
    @Ref('textarea')
    readonly textareaRef!: HTMLTextAreaElement

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
        type: Number,
        default: 1,
    })
    readonly rows!: number

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly readonly!: boolean

    focus() {
        this.textareaRef?.focus()
    }

    onInput(e: any) {
        const val = e?.target?.value ?? ''

        /**
         * @event input
         */
        this.$emit('input', val)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-textArea {
    display: inline-flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid $color-purple-heart;
    border-radius: 4px;
    background: $color-white;
    overflow: hidden;

    textarea {
        display: block;
        border: 0;
        border-radius: 4px;
        background: transparent;
        padding: 8px;
        color: $color-black;
        font-size: 14px;
        line-height: 1.6;
        width: 100%;
        height: inherit;
        box-sizing: border-box;
        resize: none;

        &:read-only {
            background-color: rgba($color: $color-concrete, $alpha: 0.5);
        }
    }
}
</style>
