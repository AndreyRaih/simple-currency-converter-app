<template>
  <section :class="$style.Container">
    <n-form-item :class="$style.FormItem" :label-style="currencyFieldLabelStyle" label="Amount">
      <n-input-number
        :class="$style.AmountInput"
        :value="amount"
        placeholder="Enter amount"
        @update:value="(value) => $emit('update:amount', value as number)"
      />
    </n-form-item>

    <currency-select
      :class="$style.FormItem"
      label="From"
      placeholder="Select From"
      :options="symbols"
      :value="current"
      @update:value="(value) => $emit('update:current', value)"
    />

    <n-button :class="$style.ReplaceButton" circle @click="() => $emit('switch-currencies')">
      <template #icon>
        <n-icon>
          <replace-icon />
        </n-icon>
      </template>
    </n-button>

    <currency-select
      :class="$style.FormItem"
      label="To"
      placeholder="Select To"
      :options="symbols"
      :value="target"
      @update:value="(value) => $emit('update:target', value)"
    />

    <n-button
      :class="$style.ConvertButton"
      :loading="loading"
      type="primary"
      @click="() => $emit('convert-currencies')"
    >Convert</n-button>
  </section>
</template>

<style lang="less" module>
.Container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.FormItem {
  flex: 1;
  width: 100%;
  min-width: 160px;
}

.ReplaceButton {
  margin: 26px 14px 0 14px;
}

.ConvertButton {
  margin: 26px 0 0 14px;
}

.AmountInput {
  width: 90%;
}

@media screen and (max-width: 768px) {
  .Container {
    flex-direction: column;
    margin-bottom: 48px;
  }

  .ReplaceButton {
    margin: 0;
    margin-bottom: 24px;
  }

  .ConvertButton {
    margin: 0;
    margin-top: 24px;
  }

  .AmountInput {
    width: 100%;
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NFormItem, NInputNumber, NButton, NIcon } from 'naive-ui'
import { ArrowsHorizontal as ReplaceIcon } from '@vicons/carbon'
import type { SelectOption } from 'naive-ui'
import CurrencySelect from '@/components/shared/CurrencySelect.vue'
import { currencyFieldLabelStyle } from '@/components/shared/constants'

export default defineComponent({
  name: 'ConverterAmountForm',
  components: {
    NFormItem,
    NInputNumber,
    CurrencySelect,
    NButton,
    NIcon,
    ReplaceIcon
  },
  props: {
    amount: {
      type: Number || String,
      required: true,
      default: null
    },
    current: {
      type: String,
      required: true,
      default: null
    },
    target: {
      type: String,
      required: true,
      default: null
    },
    symbols: {
      type: Array as PropType<SelectOption[]>,
      required: true,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update:amount',
    'update:current',
    'update:target',
    'switch-currencies',
    'convert-currencies'
  ],
  setup () {
    return {
      currencyFieldLabelStyle
    }
  }
})
</script>
