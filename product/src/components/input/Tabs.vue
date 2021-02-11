<template>
    <InputGroup class="ejn-tabs">
        <template v-if="label">
            <span class="label">
                {{ label }}
            </span>
        </template>
        <template v-for="(row, key) in option">
            <Btn
                :key="key"
                :color="row === value && 'primary'"
                @click="() => click(row)"
            >
                {{ row }}
            </Btn>
        </template>
    </InputGroup>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import InputGroup from '@/components/input/InputGroup.vue'
import Btn from '@/components/input/Btn.vue'

@Component({
    components: {
        InputGroup,
        Btn,
    },
})
export default class Tabs extends Vue {
    @Prop({
        type: [String, Number],
        default: '',
    })
    readonly value!: string | number

    @Prop({
        type: String,
        default: '',
    })
    readonly label!: string

    @Prop({
        type: Array,
        required: true,
    })
    readonly option!: (string | number)[]

    click(value: string | number) {
        /**
         * @event input
         */
        this.$emit('input', value)
    }
}
</script>
