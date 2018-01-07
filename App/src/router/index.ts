import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig, Route, NavigationGuard } from 'vue-router'

const blog: AsyncComponent = (): any => import('@/components/blog.vue')

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'blog',
    component: blog
  }
]

const router: Router = new Router({
  mode: 'history',
  base: '/',
  routes
})

export default router
