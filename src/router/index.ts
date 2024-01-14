import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoListView from '@/views/TodoListView.vue'
import LifecycleHooksView from '@/views/LifecycleHooksView.vue'
import WatchersView from '@/views/WatchersView.vue'
import TemplateRefsView from '@/views/TemplateRefsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoListView
    },
    {
      path: '/lifecycle',
      name: 'lifecycle',
      component: LifecycleHooksView
    },
    {
      path: '/watchers',
      name: 'watchers',
      component: WatchersView
    },
    {
      path: '/template-refs',
      name: 'template-refs',
      component: TemplateRefsView
    },
    {
      path: '/css-grid',
      name: 'css-grid',
      component: () => import('../views/CssGridView.vue')
    }
  ]
})

export default router
