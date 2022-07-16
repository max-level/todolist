import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Add from '@/components/Add.vue'
import Done from '@/components/Done.vue'
import Delete from '@/components/Delete.vue'
import Edit from '@/components/Edit.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '',
        redirect: { name: 'add' }
      },
      {
        path: '/add',
        name: 'add',
        component: Add
      },
      {
        path: '/done',
        name: 'done',
        component: Done
      },
      {
        path: '/delete',
        name: 'delete',
        component: Delete
      },
      {
        path: '/edit',
        name: 'edit',
        component: Edit
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active'
})

export default router
