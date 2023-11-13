import { createRouter, createWebHistory } from 'vue-router'

import mainlayout from '../components/layouts/mainlayout'

const routes = [
  {
    path:'/',
        component: mainlayout,
        children: [
            {
              path:'',
              component: () => import('../components/pages/HomeView')
            },
            {
              path:'logout',
              component: () => import('../components/pages/logout')
            },
            {
              path:'imagine',
              component: () => import('../components/pages/Imagine')
            },
            {
              path:'imagine/mid/:id',
              component: () => import('../components/pages/ImagineMidResult')
            },
            {
              path:'imagine/U/:id',
              component: () => import('../components/pages/ImagineUpResult')
            },
            {
              path:'imagine/:id',
              component: () => import('../components/pages/ImagineMidResult')
            },
            {
              path:'my-imagine',
              component: () => import('../components/pages/MyImagine')
            },
            {
              path:'charge',
              component: () => import('../components/pages/Charge')
            },
            {
              path:'success',
              component: () => import('../components/pages/Success')
            }
        ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router