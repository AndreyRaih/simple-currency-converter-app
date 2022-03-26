<template>
  <n-tabs
    :class="$style.Container"
    :value="selectedItem"
    @update:value="(value) => $emit('update:navigation', value)"
    type="line"
    size="large"
  >
    <n-tab
      v-for="(option, index) in menu"
      :key="index"
      :name="option.name"
    >
      {{ option.label }}
    </n-tab>
  </n-tabs>
</template>

<style lang="less" module>
.Container {
  margin-bottom: 36px;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NTabs, NTab } from 'naive-ui'
import { NavigationMenuOption } from '@/typings.d'

export default defineComponent({
  name: 'NavigationMenu',
  components: {
    NTabs,
    NTab
  },
  props: {
    selectedItem: {
      type: String,
      default: null
    },
    menu: {
      required: true,
      type: Array as PropType<NavigationMenuOption[]>,
      default: () => ([])
    }
  },
  emits: ['update:navigation']
})
</script>
