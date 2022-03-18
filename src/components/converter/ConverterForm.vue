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
import type { ConverterResultData, ConverterData } from '@/typings.d'

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
      type: Object as PropType<ConverterData>,
      default: () => ({
        from: null,
        to: null,
        amount: 0
      })
    },
    converterResult: {
      required: true,
      type: Object as PropType<ConverterResultData>,
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
    const converterFormData = ref()

    onBeforeMount(() => {
      converterFormData.value = { ...props.converterData }
    })

    watch(() => converterFormData.value, () => emit('clear-result'), { deep: true })

    onBeforeUnmount(() => emit('clear-result'))

    const showResultView = computed(() => Boolean(props.converterResult && Object.keys(props.converterResult).length))

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
