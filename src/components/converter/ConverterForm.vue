<template>
  <converter-controlls
    v-model:amount="converterFormData.amount"
    v-model:current="converterFormData.from"
    v-model:target="converterFormData.to"
    :symbols="symbols"
    :loading="loading"
    @switch-currencies="handleSwitchCurrencies"
    @convert-currencies="() => $emit('convert', converterFormData)"
  />
  <n-collapse-transition :show="showResultView">
    <converter-result :data="converterResult" />
  </n-collapse-transition>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, watch, onBeforeMount, onBeforeUnmount } from 'vue'
import ConverterControlls from './views/Controlls.vue'
import ConverterResult from './views/Result.vue'
import { NCollapseTransition } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import type { ConversionResult, ConversionQuery } from '@/typings.d'

export default defineComponent({
  name: 'ConverterView',
  components: {
    ConverterControlls,
    ConverterResult,
    NCollapseTransition
  },
  props: {
    converterData: {
      required: true,
      type: Object as PropType<ConversionQuery>,
      default: () => ({
        from: '',
        to: '',
        amount: 0
      })
    },
    converterResult: {
      required: true,
      type: Object as PropType<ConversionResult>,
      default: null
    },
    symbols: {
      required: true,
      type: Array as PropType<SelectOption[]>
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'convert',
    'clear-result'
  ],
  setup (props, { emit }) {
    const converterFormData = ref<ConversionQuery>({
      from: '',
      to: '',
      amount: 0
    })

    const showResultView = computed(() => Boolean(props.converterResult && Object.keys(props.converterResult).length))

    watch(() => converterFormData.value, () => emit('clear-result'), { deep: true })

    onBeforeMount(() => {
      /**
       * NOTE: Here we break the reactivity bindings. It has been done for 2 reasons:
       * 1. Separate inner objects from outer, and avoid mutating source state
       * 2. Stick to "Data - Down, Actions - Up" approach
       * 
       * Actually, if i got it right, for now there is no better way to handle similar cases
       */
      converterFormData.value = { ...props.converterData }
    })

    onBeforeUnmount(() => emit('clear-result'))

    const handleSwitchCurrencies = () => {
      const prevTo = converterFormData.value.to
      const prevFrom = converterFormData.value.from
      converterFormData.value.from = prevTo
      converterFormData.value.to = prevFrom
    }

    return {
      converterFormData,
      handleSwitchCurrencies,
      showResultView
    }
  }
})
</script>
