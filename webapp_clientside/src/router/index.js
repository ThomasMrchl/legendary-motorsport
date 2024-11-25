import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Catalog from "@/components/Catalog.vue";
import Login from '../components/Login.vue';
import Create from '../components/Create.vue';
import Modify from '../components/Modify.vue';
import Error from '../components/404.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/catalog/:id',
      name: 'catalog',
      component: Catalog,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true
    },
    {
      path: '/create/:table',
      name: 'create',
      component: Create,
      props: true
    },
    {
      path: '/modify/:table',
      name: 'modify',
      component: Modify,
      props: true
    },
    {
      path: '*',
      name: 'notFound',
      component: Error
    }
  ]
})
