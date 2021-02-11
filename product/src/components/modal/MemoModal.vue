<template>
    <div v-if="show" class="ejn-memoModal">
        <div class="memoModal-container">
            <div class="memoModal-textarea">
                <TextArea
                    v-model="form.memo"
                    ref="textarea"
                    :rows="6"
                    placeholder="메모를 입력해주세요."
                />
            </div>
            <div class="memoModal-btns">
                <Btn @click="hideModal">취소</Btn>
                <Btn color="primary" @click="save">저장</Btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import Btn from '@/components/input/Btn.vue'
import TextArea from '@/components/input/TextArea.vue'
import { useMemoStore } from '@/store/memo'

@Component({
    components: {
        Btn,
        TextArea,
    },
})
export default class MemoModal extends Vue {
    @Ref('textarea')
    readonly textareaRef!: TextArea

    form = {
        memo: '',
    }

    get memoStore() {
        return useMemoStore(this.$store)
    }

    get show() {
        return this.memoStore.state.show
    }

    get memo() {
        return this.memoStore.state.memo
    }

    @Watch('show')
    watchShow(show: boolean) {
        if (show) {
            this.form.memo = this.memo
            this.$nextTick(() => {
                this.textareaRef.focus()
            })
            return
        }

        this.form.memo = ''
    }

    save() {
        this.memoStore.save(this.form.memo)
    }

    hideModal() {
        this.memoStore.hideModal()
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-memoModal {
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

    .memoModal-container {
        width: 280px;
        max-height: 80%;
        background-color: $color-white;
        box-shadow: 0 6px 12px rgba($color: $color-black, $alpha: 0.2);
        border-radius: 4px;
        overflow: auto;

        .memoModal-textarea {
            .ejn-textArea {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }
        }

        .memoModal-btns {
            display: flex;

            .ejn-btn {
                flex: 1;
                height: 36px;
                border: 0;
                border-radius: 0;
            }
        }
    }
}
</style>
