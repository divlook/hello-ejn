<template>
    <InputGroup class="ejn-memoOpener">
        <span class="label">
            메모
        </span>

        <Btn :color="hasMemo && 'primary'" @click="showModal">
            {{ hasMemo ? '수정' : '추가' }}
        </Btn>
    </InputGroup>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import InputGroup from '@/components/input/InputGroup.vue'
import Btn from '@/components/input/Btn.vue'
import { useMemoStore } from '@/store/memo'

@Component({
    components: {
        InputGroup,
        Btn,
    },
})
export default class MemoOpener extends Vue {
    @Prop({
        type: String,
        default: '',
    })
    readonly value!: string

    get memoStore() {
        return useMemoStore(this.$store)
    }

    get hasMemo() {
        return !!this.value
    }

    onChange(e: any) {
        /**
         * @event change
         */
        this.$emit('change', e)
    }

    showModal() {
        this.memoStore.showModal({
            memo: this.value,
            callback: (value) => {
                /**
                 * @event input
                 */
                this.$emit('input', value)
            },
        })
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';
</style>
