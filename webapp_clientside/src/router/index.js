import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Catalog from "@/components/Catalog.vue";
import Login from '../components/Login.vue';


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
    }
  ]
})
