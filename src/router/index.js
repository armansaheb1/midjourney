import { createRouter, createWebHistory } from 'vue-router'

import mainlayout from '../components/layouts/mainlayout'

const routes = [
  {
    path:'/',
        component: mainlayout,
        children: [
            {
              path:'',
              component: () => import('@/components/HomeView')
            }
        ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router