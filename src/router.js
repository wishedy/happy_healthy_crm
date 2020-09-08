import index from './views/components/Calendar/index.vue'
import manage from './views/column/001/index'// 管理全站栏目
import questions from './views/column/002/index'// 管理全站栏目
import questionsType from './views/column/003/index'// 管理全站栏目
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
    },
    {
      path: '/002',
      component: questions
    },
    {
      path: '/003',
      component: questionsType
    }
  ]
}
