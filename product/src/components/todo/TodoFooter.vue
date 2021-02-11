<template>
    <form class="ejn-todoFooter" @submit.prevent="submit">
        <div class="pt-2 px-2">
            <InputGroup class="mr-2 mb-2">
                <span class="label">
                    우선순위
                </span>

                <SelectBox v-model="form.priority" :option="priorityLabels" />
            </InputGroup>

            <MemoOpener v-model="form.memo" class="mr-2 mb-2" />

            <InputGroup class="mb-2">
                <span class="label">
                    마감 기한
                </span>

                <Datepicker v-model="form.deadlineMs" />
            </InputGroup>
        </div>

        <div class="px-2 mb-2">
            <InputGroup class="w-100" large>
                <TextField
                    ref="subject"
                    v-model="form.subject"
                    class="flex-1"
                    placeholder="무슨 일을 해야되나요?"
                    required
                />

                <Btn type="submit" color="primary">등록</Btn>
            </InputGroup>
        </div>
    </form>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import Btn from '@/components/input/Btn.vue'
import TextField from '@/components/input/TextField.vue'
import InputGroup from '@/components/input/InputGroup.vue'
import SelectBox from '@/components/input/SelectBox.vue'
import Datepicker from '@/components/input/Datepicker.vue'
import MemoOpener from '@/components/input/MemoOpener.vue'
import { priorityInitialValue, priorityLabels } from '@/libs/constant'
import { useTodoStore } from '@/store/todo'

@Component({
    components: {
        Btn,
        TextField,
        InputGroup,
        SelectBox,
        Datepicker,
        MemoOpener,
    },
})
export default class TodoFooter extends Vue {
    @Ref('subject')
    readonly subjectRef!: TextField

    form = {
        subject: '',
        priority: priorityInitialValue,
        memo: '',
        deadlineMs: 0,
    }

    get todoStore() {
        return useTodoStore(this.$store)
    }

    get priorityLabels() {
        return priorityLabels
    }

    reset() {
        this.form.subject = ''
        this.form.priority = priorityInitialValue
        this.form.memo = ''
        this.form.deadlineMs = 0
    }

    submit() {
        if (!this.form.subject) {
            this.subjectRef.focus()
            return
        }

        if (this.todoStore.append(this.form)) {
            this.reset()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-todoFooter {
    display: block;
    background-color: $color-white;
    box-shadow: 0 0 10px rgba($color: $color-black, $alpha: 0.2);
}
</style>
