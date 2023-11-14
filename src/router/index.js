import { createRouter, createWebHistory } from 'vue-router'

import mainlayout from '../components/layouts/mainlayout'
import adminmainlayout from '../adminComponents/layouts/mainlayout'

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
  },
  {
  path:'/admin/',
        component: adminmainlayout,
        children: [
            {
              path:'',
              component: () => import('../adminComponents/pages/HomeView')
            },
            {
              path:'users',
              component: () => import('../adminComponents/pages/Users')
            },
            {
              path:'transactions',
              component: () => import('../adminComponents/pages/Transactions')
            },
            {
              path:'imagines',
              component: () => import('../adminComponents/pages/Imagines')
            },
            
        ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router