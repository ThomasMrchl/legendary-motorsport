<template>
    <div>
        <div class="banner">
            <img :src="require('@/assets/img/loginBanner.jpg')">
            <h1 style="color: #EE0000;">Legendary Motorsport</h1>
            <p>Please log in to continue</p>
        </div>
        <div class="parta">
            <div class="text-container">
                <h2>Login</h2>
                <p>Enter your credentials to access your account.</p>
                <form @submit.prevent="handleLogin">
                    <div>
                        <label for="username">Username:</label>
                        <input type="text" id="username" v-model="username" required>
                    </div>
                    
                    <div>
                        <label for="password">Password:</label>
                        <input type="password" id="password" v-model="password" required>
                    </div>
                    <div>
                        <input type="checkbox" id="rememberMe" name="rememberMe">
                        <label for="rememberMe">Remember me</label>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <img :src="require('@/assets/img/pegassi_osiris.jpg')">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        handleLogin() {
            // Handle login logic here
            console.log('Username:', this.username);
            console.log('Password:', this.password);
        }
    }
};
</script>



<style scoped>

div {
  background-color: #510A08;
  border-bottom: #510A08;
}

.banner {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px); 
  position: absolute;
  top: 0;
  left: 0;
}

.banner h1, .banner p {
  position: absolute;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); 
}

img :hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.banner h1 {
  font-size: 48px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}


.banner p {
  font-size: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}


.title {
  font-size: 24px;
  top: 50%;
  left: 50%;
  margin: 0;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.parta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  gap: 20px;
}

#rd {
  max-width: 40%;
}

/* Group h2 and p inside the text-container */
.text-container {
  flex: 1;
  padding-right: 20px;
}

/* Style a box around the text container*/
.text-container {
  background-color: #320505;
  padding: 40px;
  border-radius: 8px;
  border-width: 4px;
  border-color: #a30000;
}

.text-container form{
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #320505;
  color: #ffffff;
  padding: 20px; 
  border-radius: 8px; 
  outline: 3px solid #ae0000;
}

.text-container form > div {
  background-color: #320505; 
  padding: 10px;
  border-radius: 4px;
}

.text-container h2 {
  font-size: 2rem;
  color: white;
  margin-bottom: 10px;
}

.text-container p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: white;
}

.parta img {
  max-width: 60%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 0 1 400px;
  transition: box-shadow 0.3s ease-in-out; /* Transition added for smooth hover effect */
}

.parta h2{
  color:#ab0000
}
.parta img:hover {
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.4); /* Shadow effect on hover */
}

@media (max-width: 768px) {
  .parta {
    flex-direction: column;
    text-align: center;
  }

  .parta img {
    margin-top: 20px;
  }

  .text-container {
    padding-right: 0;
  }
}


</style>
