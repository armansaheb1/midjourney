import { createRouter, createWebHistory } from 'vue-router'

import mainlayout from '../components/layouts/mainlayout'
import adminmainlayout from '../adminComponents/layouts/mainlayout'
import simplelayout from '../adminComponents/layouts/simplelayout'
import blanklayout from '../components/layouts/blanklayout'

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
              path:'login',
              component: () => import('../components/pages/Login2')
            },
            {
              path:'verify-phone',
              component: () => import('../components/pages/VerifyPhone')
            },
            {
              path:'logout',
              component: () => import('../components/pages/logout')
            },
            
          
            {
              path:'my-gpt',
              component: () => import('../components/pages/MyGPT')
            },
            {
              path:'faceswap',
              component: () => import('../components/pages/FaceSwap')
            },
            {
              path:'faceswap/:id',
              component: () => import('../components/pages/FaceSwap')
            },
            {
              path:'imagine/mid/:id',
              component: () => import('../components/pages/ImagineMidResult')
            },
            {
              path:'imagine/U/:id',
              component: () => import('../components/pages/ImagineMidResult')
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
              path:'my-faceswap',
              component: () => import('../components/pages/MyFaceSwap')
            },
            {
              path:'charge',
              component: () => import('../components/pages/Charge')
            },
            {
              path:'success',
              component: () => import('../components/pages/Success')
            },
            {
              path:'forgot/:token',
              component: () => import('../components/pages/forgot')
            },
            {
              path:'rules',
              component: () => import('../components/pages/rules')
            },
            {
              path:'contact',
              component: () => import('../components/pages/Contact')
            },
            {
              path:'blog',
              component: () => import('../components/pages/Blog')
            },
            {
              path:'blog/:id',
              component: () => import('../components/pages/Post')
            },
        ]
  },
  {
    path:'/',
        component: blanklayout,
        children: [
          {
            path:'support',
            component: () => import('../components/pages/support')
          },
          {
            path:'support/:id',
            component: () => import('../components/pages/support')
          },
          {
            path:'gpt',
            component: () => import('../components/pages/Gpt')
          },
          {
            path:'gpt/:id',
            component: () => import('../components/pages/Gpt')
        },
          {
            path:'imagine',
            component: () => import('../components/pages/Imagine')
          },
          {
            path:'logo',
            component: () => import('../components/pages/LogoMaker')
          },
        ],
      },
  {
    path:'/admin/',
          component: simplelayout,
          children: [
              {
                path:'',
                component: () => import('../adminComponents/pages/HomeView2')
              },
              
          ]
    },
  {
  path:'/admin/',
        component: adminmainlayout,
        children: [
            {
              path:'dashboard',
              component: () => import('../adminComponents/pages/HomeView2')
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
            {
              path:'packages',
              component: () => import('../adminComponents/pages/packages')
            },
            {
              path:'swaps',
              component: () => import('../adminComponents/pages/swaps')
            },
            {
              path:'bonus',
              component: () => import('../adminComponents/pages/Bonus')
            }
            
            
        ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router