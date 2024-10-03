import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/cars',
      redirect: '/cars/list/all',
    },
    {
      path: '/cars/:action/:id',
      name: 'cars',
      component: HelloWorld,
      props: true
    }
  ]
})
