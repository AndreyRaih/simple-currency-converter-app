<template>
  <converter-form
    :converterData="conversionQuery"
    :converterResult="conversionResult"
    :symbols="symbolsOptions"
    :loading="convertingInProgress"
    @clear-result="handleClearResult"
    @convert="handleConverting"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import ConverterForm from '@/components/converter/ConverterForm.vue'
import { useCurrency } from '@/hooks/useCurrency'
import { useFormatter } from '@/hooks/useFormatter'
import { ConversionQuery } from '@/typings'

export default defineComponent({
  name: 'ConverterPage',
  components: {
    ConverterForm
  },
  setup () {
    const { conversionQuery, conversionResult, symbolsList, convert, clearResult } = useCurrency()
    const { formatSymbolsToOptions } = useFormatter()

    const symbolsOptions = computed(() => formatSymbolsToOptions(symbolsList.value))
    const convertingInProgress = ref<boolean>(false)
    const handleConverting = async (converterFormData: ConversionQuery) => {
      convertingInProgress.value = true
      try {
        await convert(converterFormData)
      } finally {
        convertingInProgress.value = false
      }
    }

    return {
      conversionQuery,
      conversionResult,
      symbolsOptions,
      convertingInProgress,
      handleClearResult: clearResult,
      handleConverting
    }
  }
})
</script>
