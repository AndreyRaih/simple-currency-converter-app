<template>
  <main-layout :loading="isAppLoading">
    <template #navigation>
      <navigation-menu
        :selected-item="selectedValue"
        :menu="menuOptions"
        @update:navigation="handleNavigationUpdates"
      />
    </template>
    <router-view />
  </main-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import MainLayout from '@/components/MainLayout.vue'
import NavigationMenu from '@/components/NavigationMenu.vue'
import { useNavigationMenu } from '@/hooks/useNavigationMenu'
import { useCurrency } from './hooks/useCurrency'

export default defineComponent({
  name: 'AppMain',
  components: {
    MainLayout,
    NavigationMenu
  },
  setup () {
    const { initialiseAppCurrencyData } = useCurrency()
    const { selectedValue, menuOptions, handleNavigationUpdates } = useNavigationMenu()

    const isAppLoading = ref<boolean>(true)

    onMounted(() => {
      initialiseAppCurrencyData().finally(() => {
        isAppLoading.value = false
      })
    })

    return {
      selectedValue,
      menuOptions,
      handleNavigationUpdates,
      isAppLoading
    }
  }
})
</script>
