import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Catalog from "@/components/Catalog.vue";
import Login from '../components/Login.vue';
import Create from '../components/Create.vue';
import Modify from '../components/Modify.vue';
import Car from "../components/Car.vue";


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
      path: '/catalog',
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
      path: '/car/:id',
      name: 'car',
      component: Car,
      props: true
    },
    {
      path: '/modify/:table/:id',
      name: 'modify',
      component: Modify,
      props: true
    }
  ]
})
