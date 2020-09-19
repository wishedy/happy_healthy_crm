import index from './views/components/Calendar/index.vue'
import manage from './views/column/001/index'// 管理全站栏目
import questions from './views/column/002/index'// 管理全站栏目
import questionsType from './views/column/003/index'// 管理全站栏目
import banner from './views/column/004/index'// 管理全站栏目
import article from './views/column/005/index'// 管理全站栏目
import password from './views/column/006/index'// 管理全站栏目
import user from './views/column/007/index'// 管理全站栏目
import indent from './views/column/008/index'// 管理全站栏目
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
    },
    {
      path: '/005',
      component: article
    },
    {
      path: '/004',
      component: banner
    },
    {
      path: '/006',
      component: password
    },
    {
      path: '/007',
      component: user
    },
    {
      path: '/008',
      component: indent
    }
  ]
}
