<template>
    <div class="ejn-selectBox" @click="showModal">
        {{ output }}
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { useSelectStore } from '@/store/select'

@Component
export default class SelectBox extends Vue {
    @Prop({
        type: [String, Number],
        default: '',
    })
    readonly value!: string | number

    @Prop({
        default: '선택해주세요.',
    })
    readonly placeholder!: string

    @Prop({
        type: Array,
        default: () => [],
    })
    readonly option!: (string | number)[]

    get selectStore() {
        return useSelectStore(this.$store)
    }

    get output() {
        if (this.value === '') {
            return this.placeholder
        }

        if (this.option.indexOf(this.value) === -1) {
            return this.placeholder
        }

        return this.value
    }

    showModal() {
        if (this.option.length === 0) {
            return
        }

        this.selectStore.showModal({
            option: this.option,
            selectedValue: this.value,
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

.ejn-selectBox {
    display: inline-flex;
    padding: 0 8px;
    background: $color-white;
    color: $color-black;
    font-size: 14px;
    line-height: $line-height;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid $color-purple-heart;
    height: 28px;
    align-items: center;
    box-sizing: border-box;
}
</style>
