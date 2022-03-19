<template>
  <currencies-list
    :base-currency="baseCurrency"
    :symbols="symbolsOptions"
    :rates="ratedTableData"
    :loading="ratesUpdatingInProgress"
    @base-currency-changed="handleBaseCurrencyChanged"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount } from 'vue'
import CurrenciesList from '@/components/currencies-list/CurrenciesList.vue'
import { useCurrency } from '@/hooks/useCurrency'
import { useFormatter } from '@/hooks/useFormatter'

export default defineComponent({
  name: 'CurrenciesListPage',
  components: {
    CurrenciesList
  },
  setup () {
    const { baseCurrency, symbolsList, ratesList, changeBaseCurrency } = useCurrency()
    const { formatSymbolsToOptions, formatRatesToTableData } = useFormatter()

    const ratedTableData = computed(() => formatRatesToTableData(ratesList.value))
    const symbolsOptions = computed(() => formatSymbolsToOptions(symbolsList.value))

    const ratesUpdatingInProgress = ref<boolean>(false)
    const handleBaseCurrencyChanged = async (currencyCode: string) => {
      ratesUpdatingInProgress.value = true
      try {
        await changeBaseCurrency(currencyCode)
      } finally {
        ratesUpdatingInProgress.value = false
      }
    }

    onBeforeMount(() => handleBaseCurrencyChanged(baseCurrency.value))

    return {
      baseCurrency,
      symbolsOptions,
      ratedTableData,
      ratesUpdatingInProgress,
      handleBaseCurrencyChanged
    }
  }
})
</script>
