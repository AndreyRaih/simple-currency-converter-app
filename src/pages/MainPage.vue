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
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useMessage } from 'naive-ui'
import MainLayout from '@/components/MainLayout.vue'
import NavigationMenu from '@/components/NavigationMenu.vue'
import { useNavigationMenu } from '@/hooks/useNavigationMenu'
import { useCurrency } from '@/hooks/useCurrency'
import { GENERIC_ERROR_TEXT } from '@/utils/constants'

export default defineComponent({
  name: 'MainPage',
  components: {
    MainLayout,
    NavigationMenu
  },
  setup () {
    const { initialiseAppCurrencyData } = useCurrency()
    const { selectedValue, menuOptions, handleNavigationUpdates } = useNavigationMenu()
    const message = useMessage()

    const isAppLoading = ref<boolean>(true)

    onBeforeMount(() => {
      initialiseAppCurrencyData().catch(() => message.error(GENERIC_ERROR_TEXT)).finally(() => {
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
