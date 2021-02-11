<template>
    <form
        class="ejn-todoItem p-2"
        :class="{ 'ejn-todoItem-completed': isCompleted }"
        @submit.prevent="submit"
    >
        <div>
            <InputGroup class="mr-2 mb-2">
                <span class="label">
                    우선순위
                </span>

                <SelectBox
                    :value="todo.priority"
                    :option="priorityLabels"
                    @input="changePriority"
                />
            </InputGroup>

            <MemoOpener
                :value="todo.memo"
                class="mr-2 mb-2"
                @input="changeMemo"
            />

            <InputGroup class="mr-2 mb-2">
                <span class="label">
                    마감 기한
                </span>

                <Datepicker :value="todo.deadlineMs" @input="changeDeadline" />
            </InputGroup>

            <InputGroup class="mb-2">
                <span class="label">
                    등록일
                </span>

                <span class="text">{{ createdAt }}</span>
            </InputGroup>
        </div>

        <div>
            <InputGroup class="w-100" large>
                <span v-if="!state.isEditable" class="label">
                    <input
                        type="checkbox"
                        :checked="isCompleted"
                        @change="changeCompleted"
                    />
                </span>

                <TextField
                    ref="subject"
                    :value="todo.subject"
                    class="flex-1"
                    placeholder="무슨 일을 해야되나요?"
                    :readonly="!state.isEditable"
                    required
                    @input="changeSubject"
                />

                <template v-if="!state.isEditable">
                    <Btn @click="toggleEditable">수정</Btn>
                    <Btn color="danger" @click="remove">삭제</Btn>
                </template>
                <template v-else>
                    <Btn type="submit" color="primary">수정 완료</Btn>
                </template>
            </InputGroup>
        </div>
    </form>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import Btn from '@/components/input/Btn.vue'
import TextField from '@/components/input/TextField.vue'
import InputGroup from '@/components/input/InputGroup.vue'
import SelectBox from '@/components/input/SelectBox.vue'
import Datepicker from '@/components/input/Datepicker.vue'
import MemoOpener from '@/components/input/MemoOpener.vue'
import { priorityLabels } from '@/libs/constant'
import { dateFormat } from '@/libs/date'
import { Todo, useTodoStore } from '@/store/todo'

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
export default class TodoItem extends Vue {
    @Ref('subject')
    readonly subjectRef!: TextField

    @Prop({
        required: true,
    })
    readonly todo!: Todo

    state = {
        isEditable: false,
    }

    form = {
        subject: '',
    }

    get todoStore() {
        return useTodoStore(this.$store)
    }

    get priorityLabels() {
        return priorityLabels
    }

    get isCompleted() {
        return this.todo.completedMs > 0
    }

    get createdAt() {
        return dateFormat(this.todo.createdMs)
    }

    submit() {
        if (!this.form.subject) {
            this.subjectRef.focus()
            return
        }

        this.todoStore.update({
            id: this.todo.id,
            subject: this.form.subject,
        })

        this.state.isEditable = false
    }

    changePriority(priority: string) {
        this.todoStore.update({
            id: this.todo.id,
            priority,
        })
    }

    changeMemo(memo: string) {
        this.todoStore.update({
            id: this.todo.id,
            memo,
        })
    }

    changeDeadline(deadlineMs: number) {
        this.todoStore.update({
            id: this.todo.id,
            deadlineMs,
        })
    }

    changeSubject(subject: string) {
        this.form.subject = subject
    }

    changeCompleted() {
        this.todoStore.update({
            id: this.todo.id,
            completed: !this.isCompleted,
        })
    }

    toggleEditable() {
        const prevEditable = this.state.isEditable

        if (!prevEditable) {
            this.form.subject = this.todo.subject
        }

        this.state.isEditable = !prevEditable

        if (this.state.isEditable) {
            this.$nextTick(() => {
                this.subjectRef.focus()
            })
        }
    }

    remove() {
        this.todoStore.remove(this.todo.id)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.ejn-todoItem {
    background-color: $color-white;
    box-shadow: 0 2px 6px rgba($color: $color-black, $alpha: 0.2);
    border-radius: 4px;
    transition: opacity 0.5s;

    &.ejn-todoItem-completed {
        opacity: 0.4;
    }
}
</style>
