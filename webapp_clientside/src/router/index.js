import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Catalog from "@/components/Catalog.vue";
import Login from '../components/Login.vue';
import Create from '../components/Create.vue';
import Modify from '../components/Modify.vue';
import Error from '../components/404.vue';
import Car from "../components/Car.vue";
import Register from '../components/Register.vue';
import AuthModule from "../components/AuthModule.vue";
import User from "../components/User.vue";

const axios = require('axios')

async function checkAuthStatus() {
  try {
      const response = await axios.get('http://localhost:3000/auth/session-status', { withCredentials: true });
      return response.data.loggedIn;
  } catch (err) {
      return false;
  }
}

async function checkAdmin() {
  try {
      const response = await axios.get('http://localhost:3000/auth/session-status', { withCredentials: true });
      return (response.data.user.user_role == 'ADMIN');
  } catch (err) {
      return false;
  }
}

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
      props: true,
      beforeEnter: async (to, from, next) => {
        const loggedIn = await checkAuthStatus();
        if (loggedIn) {
            next('/');
        } else {
            next();
        }
      }
    },
    {
      path: '/create/car',
      name: 'createc',
      component: Create,
      props: { table: 'car' },
      beforeEnter: async (to, from, next) => {
        const isAdmin = await checkAdmin();
        if (isAdmin) {
            next();
        } else {
            next('/');
        }
      }
    },
    {
      path: '/create/address',
      name: 'createa',
      component: Create,
      props: { table: 'address' },
      beforeEnter: async (to, from, next) => {
        const loggedIn = await checkAuthStatus();
        if (loggedIn) {
            next();
        } else {
            next('/');
        }
      }
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
      props: true,
      beforeEnter: async (to, from, next) => {
        const isAdmin = await checkAdmin();
        if (isAdmin) {
            next();
        } else {
            next('/');
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: async (to, from, next) => {
        const loggedIn = await checkAuthStatus();
        if (loggedIn) {
            next('/');
        } else {
            next();
        }
      }
    },
    {
      path: '*',
      name: 'notFound',
      component: Error
    },
    {
      path: '/auth',
      name: 'AuthenticationDemo',
      component: AuthModule
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      beforeEnter: async (to, from, next) => {
        const loggedIn = await checkAuthStatus();
        if (loggedIn) {
            next();
        } else {
            next('/');
        }
      }
    }
  ]
})
