import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/pages/MainPage.vue'),
    children: [
      {
        path: '',
        name: 'converter',
        component: () => import('@/pages/subpages/ConverterPage.vue')
      },
      {
        path: 'list',
        name: 'currencies-list',
        component: () => import('@/pages/subpages/CurrenciesListPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
