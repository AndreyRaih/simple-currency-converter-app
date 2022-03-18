<template>
  <template v-if="data">
    <n-h2 prefix="bar">{{ data.selectedAmount }} {{ data.selectedCurrencyFullName }} = {{ data.convertedAmount }} {{ data.convertedCurrencyFullName }}</n-h2>
    <n-p>1 {{ data.selectedCurrencyCode }} = {{ data.rate }} {{ data.convertedCurrencyCode }}</n-p>
    <n-text :depth="3">{{ data.selectedCurrencyFullName }} to {{ data.convertedCurrencyFullName }} conversion — Last updated {{ data.lastUpdateDate }}</n-text>
    </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NText, NP, NH2 } from 'naive-ui'
import type { ConverterResultData } from '@/typings.d'

export default defineComponent({
  name: 'ConverterAmountResult',
  props: {
    data: {
      required: true,
      type: Object as PropType<ConverterResultData>
    }
  },
  components: {
    NText,
    NP,
    NH2
  }
})
</script>
