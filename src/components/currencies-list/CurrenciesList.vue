<template>
  <currency-select
    label="Base currency"
    placeholder="Select base currency"
    :options="symbols"
    :value="baseCurrency"
    @update:value="(value) => $emit('base-currency-changed', value)"
  />
  <currencies-data-table
    :base-currency-code="baseCurrency"
    :loading="loading"
    :list="rates"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CurrencySelect from '@/components/shared/CurrencySelect.vue'
import CurrenciesDataTable from './views/RatesTable.vue'
import { SelectOption } from 'naive-ui'
import { RatesDataTableItem } from '@/typings'

export default defineComponent({
  name: 'CurrenciesList',
  components: {
    CurrencySelect,
    CurrenciesDataTable
  },
  props: {
    baseCurrency: {
      required: true,
      type: String,
      default: null
    },
    symbols: {
      required: true,
      type: Array as PropType<SelectOption[]>,
      default: () => ([])
    },
    rates: {
      required: true,
      type: Array as PropType<RatesDataTableItem[]>,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'base-currency-changed'
  ]
})
</script>
