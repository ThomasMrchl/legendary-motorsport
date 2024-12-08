<script>
import Footer from "./Footer.vue";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async logIn() {
      try {

        const response = await this.$http.post(
          "http://localhost:3000/auth/login",
          {
            username: this.username,
            password: this.password,
          },
          {withCredentials: true}
        );

        console.log("Login successful:", response.data);
        await this.$router.push("/catalog");

      } catch (error) {
        const errorMessage =
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
            ? error.response.data.message
            : error.message || "An unknown error occurred.";
        console.error("Login failed:", errorMessage);

      }
    },
      redirectToRoute(route) {
        this.$router.push(route);
      }
    },
    components: {
      Footer
    }
};
</script>

<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="content">
        <div class="top-content">
          <img
            @click="redirectToRoute('/')"
            class="logo"
            :src="require('@/assets/img/LegendaryLogo2.png')"
            alt="Logo Legendary Motorsport"
          />
          <h2>Login</h2>
        </div>
        <div class="bottom-content">
          <p>Enter your credentials to access your account.</p>
          <form @submit.prevent="logIn">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required />

            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />

            <div class="remember-me">
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              <label for="rememberMe">Remember me</label>
            </div>

            <div class="buttons">
              <button type="submit">Login</button>
              <button type="button" @click="redirectToRoute('/register')">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  color: #fff;
}

.login-wrapper {
  background: linear-gradient(135deg, #48130e, #320505);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
  gap: 100px;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.content {
  background-color: #320505;
  border: 3px solid #8b0000;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  color: #ffffff;
  animation: fadeIn 0.7s ease-out;
  transition: box-shadow 0.3s;
}

.content:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
}

.top-content {
  text-align: center;
  margin-bottom: 1.5rem;
}

.logo {
  width: 50%;
  height: auto;
  margin-bottom: 1rem;
  transition: transform 0.3s;

}

.logo:hover {
  transform: scale(1.1);
  cursor: pointer;
}

h2 {
  color: #ff4500;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.buttons {
  display: flex;
  justify-content: space-evenly
}

.bottom-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

p {
  font-size: 0.95rem;
  opacity: 0.85;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-size: 0.9rem;
  color: #ff4500;
}

input[type="text"],
input[type="password"] {
  padding: 0.75rem;
  border-radius: 10px;
  border: 2px solid #8b0000;
  background-color: #1e1e1e;
  color: #ffffff;
  transition: border 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #ff4500;
  box-shadow: 0 0 10px rgba(255, 69, 0, 0.4);
  outline: none;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  margin-right: 0.5rem;
}

button {
  background: linear-gradient(135deg, #ff4500, #8b0000);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  width: 40%;
  height: auto;
}

button:hover {
  background: linear-gradient(135deg, #ff5733, #a00000);
}

button:active {
  transform: translateY(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
