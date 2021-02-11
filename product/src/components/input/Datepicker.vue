<template>
    <div class="ejn-datepicker" @click="select">
        <input
            ref="input"
            type="datetime-local"
            :value="datetime"
            :required="required"
            @change="onChange"
            @input="onInput"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import { date2ISOString } from '@/libs/date'

@Component
export default class Datepicker extends Vue {
    @Ref('input')
    readonly inputRef!: HTMLInputElement

    @Prop({
        default: 0,
    })
    readonly value!: number

    get datetime() {
        const data = date2ISOString(this.value)

        if (!data) {
            return ''
        }

        return data
    }

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly required!: boolean

    select() {
        this.inputRef.focus()
    }

    onChange(e: any) {
        /**
         * @event change
         */
        this.$emit('change', e)
    }

    onInput(e: any) {
        const val = new Date(e?.target?.value).valueOf() || 0

        /**
         * @event input
         */
        this.$emit('input', val)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-datepicker {
    display: inline-block;
    background-color: #fff;
    height: 28px;
    box-sizing: border-box;

    input {
        border: 0;
        background: transparent;
        height: 100%;
        margin: 0;
        padding: 0 4px;
        font-size: 14px;
        box-sizing: border-box;
    }
}
</style>
