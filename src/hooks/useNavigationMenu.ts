import { ref } from 'vue'
import { RouteRecordName, useRoute, useRouter } from 'vue-router'
import type { NavigationMenuOption } from '@//typings.d'

export function useNavigationMenu () {
  const router = useRouter()
  const route = useRoute()

  const selectedValue = ref<string>()
  const menuOptions = ref<NavigationMenuOption[]>([
    {
      label: 'Converter',
      name: 'converter'
    },
    {
      label: 'Currencies List',
      name: 'currencies-list'
    }
  ])
  function handleNavigationUpdates (name: RouteRecordName): void {
    router.push({ name }).then(() => updateCurrentRoute(name))
  }

  const updateCurrentRoute = (name: RouteRecordName) => {
    selectedValue.value = name as string
  }

  router.isReady().then(() => updateCurrentRoute(route.name as RouteRecordName))

  return {
    selectedValue,
    menuOptions,
    handleNavigationUpdates
  }
}
