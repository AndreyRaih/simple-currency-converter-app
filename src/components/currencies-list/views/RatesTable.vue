<template>
  <n-data-table
    :columns="columns"
    :data="list"
    :pagination="pagination"
    :loading="loading"
    :single-line="false"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed, reactive } from 'vue'
import { NDataTable } from 'naive-ui'
import type { RatesDataTableItem } from '@/typings.d'

export default defineComponent({
  name: 'CurrencyRatesTable',
  components: {
    NDataTable
  },
  props: {
    baseCurrencyCode: {
      type: String,
      required: true,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array as PropType<RatesDataTableItem[]>,
      default: () => ([])
    }
  },
  setup (props) {
    const columns = computed(() => [
      {
        title: 'Currency',
        key: 'currency'
      },
      {
        title: `Amount in ${props.baseCurrencyCode}`,
        key: 'amount'
      }
    ])

    const paginationReactive = reactive({
      page: 1,
      pageSize: 10,
      showSizePicker: true,
      pageSizes: [10, 25, 50],
      onChange: (page: number) => {
        paginationReactive.page = page
      },
      onUpdatePageSize: (pageSize: number) => {
        paginationReactive.pageSize = pageSize
        paginationReactive.page = 1
      }
    })

    return {
      columns,
      pagination: paginationReactive
    }
  }
})
</script>
