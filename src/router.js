import index from './views/components/Calendar/index.vue'
import manage from './views/column/001/index'// 管理全站栏目
export default {
  linkActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/001',
      component: manage
    }
  ]
}
