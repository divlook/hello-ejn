<template>
    <div v-if="show" class="ejn-selectModal" @click="hideModal">
        <div class="selectModal-container">
            <template v-for="(row, key) in option">
                <div
                    :key="key"
                    class="selectModal-label"
                    :class="{
                        active: row === selectedValue,
                    }"
                >
                    <div
                        class="label-text"
                        @click.stop="() => onClickLabel(row)"
                    >
                        {{ row }}
                    </div>

                    <div class="label-bottomLine" />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useSelectStore } from '@/store/select'

@Component
export default class SelectModal extends Vue {
    get selectStore() {
        return useSelectStore(this.$store)
    }

    get option() {
        return this.selectStore.state.option
    }

    get show() {
        return this.selectStore.state.show
    }

    get selectedValue() {
        return this.selectStore.state.selectedValue
    }

    onClickLabel(value: string | number) {
        this.selectStore.confirm(value)
    }

    hideModal() {
        this.selectStore.hideModal()
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-selectModal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: $color-black, $alpha: 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .selectModal-container {
        width: 220px;
        max-height: 80%;
        background-color: $color-white;
        box-shadow: 0 6px 12px rgba($color: $color-black, $alpha: 0.2);
        border-radius: 4px;
        overflow: auto;

        .selectModal-label {
            font-size: 16px;

            .label-text {
                cursor: pointer;
                padding: 1em;
                background-color: $color-white;
                margin: 0.5em 0.5em;
                border-radius: 4px;
                text-align: center;

                &:hover {
                    background-color: $color-concrete;
                }
            }

            .label-bottomLine {
                height: 1px;
                margin: 0 0.5em;
                background-color: rgba($color: $color-black, $alpha: 0.1);
            }

            &.active {
                .label-text {
                    background-color: $color-medium-purple;
                    color: $color-white;
                }
            }

            &:last-child {
                .label-bottomLine {
                    display: none;
                }
            }
        }
    }
}
</style>
