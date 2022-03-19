<template>
  <template v-if="data">
    <n-h2 prefix="bar">{{ data.baseAmount }} {{ data.baseCurrency }} = {{ data.targetAmount }} {{ data.targetCurrency }}</n-h2>
    <n-p>1 {{ data.baseCurrencyCode }} = {{ data.rate }} {{ data.targetCurrencyCode }}</n-p>
    <n-text :depth="3">{{ data.baseCurrency }} to {{ data.targetCurrency }} conversion — actual on: {{ data.updatedOn }}</n-text>
    </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NText, NP, NH2 } from 'naive-ui'
import type { ConversionResult } from '@/typings.d'

export default defineComponent({
  name: 'ConverterAmountResult',
  props: {
    data: {
      required: true,
      type: Object as PropType<ConversionResult>
    }
  },
  components: {
    NText,
    NP,
    NH2
  }
})
</script>
