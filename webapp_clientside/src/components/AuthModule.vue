<template>
  <div class="hello">
    <h1 style="color: white">Authentication demo</h1>
    <p style="color: white">{{ msg }}</p>
    <input type="button" @click="sendRequest('post', 'login', { username: 'joeuser4', password: 'test' })" value="LOGIN USER" />
    <input type="button" @click="sendRequest('post', 'register', { username: 'joeuser5', email: 'joe@gmail.com', password: 'test' })" value="REGISTER" />
    <input type="button" @click="sendRequest('get', 'logout')" value="LOGOUT" />
    <input type="button" @click="sendRequest('get', 'session-status')" value="CHECK SESSION STATUS" />
  </div>
</template>

<script>
export default {
  name: 'AuthenticationDemo',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    async sendRequest(method, endpoint, params) {
      try {
        const config = { withCredentials: true };
        let response = null;

        if (method === "post") {
          response = await this.$http.post(`http://localhost:3000/auth/${endpoint}`, params, config);
        } else {
          response = await this.$http.get(`http://localhost:3000/auth/${endpoint}`, config);
        }

        this.msg = JSON.stringify(response.data);
      } catch (error) {
        this.msg = `Error: ${error.response && error.response.data && error.response.data.message || error.message}`;
        console.error(error);
      }
    }
  }

}
</script>
