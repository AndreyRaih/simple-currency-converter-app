<template>
  <n-form-item :label-style="currencyFieldLabelStyle" :label="label">
    <n-select
      :placeholder="placeholder"
      :options="options"
      :value="value"
      :render-label="renderLabelWithSymbol"
      @update:value="(value) => $emit('update:value', value)"
    />
  </n-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType, h } from 'vue'
import { NFormItem, NSelect, NText } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { currencyFieldLabelStyle } from './constants'

export default defineComponent({
  name: 'CurrencySelect',
  components: {
    NFormItem,
    NSelect
  },
  props: {
    label: {
      type: String,
      required: true,
      default: null
    },
    placeholder: {
      type: String,
      required: true,
      default: null
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      required: true,
      default: () => ([])
    },
    value: {
      type: String,
      default: null
    }
  },
  emits: [
    'update:value'
  ],
  setup () {
    const renderLabelWithSymbol = (option: SelectOption) => ([
      h(
        NText,
        {
          depth: 3,
          style: {
            marginRight: '8px'
          }
        },
        {
          default: () => option.value
        }
      ),
      option.label as string
    ])

    return {
      currencyFieldLabelStyle,
      renderLabelWithSymbol
    }
  }
})
</script>
