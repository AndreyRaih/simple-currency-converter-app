import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'converter',
    component: () => import('../pages/ConverterPage.vue')
  },
  {
    path: '/list',
    name: 'currencies-list',
    component: () => import('../pages/CurrenciesListPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
