<template>
    <div>
        <div class="banner">
            <img :src="require('@/assets/img/carbanner.jpg')">
            <h1>Welcome to Legendary Motorsport</h1>
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
                    <button type="submit">Login</button>
                </form>
            </div>
            <img :src="require('@/assets/img/pegassi_osiris.jpg')">
        </div>
        <Footer/>
    </div>
</template>

<script>
import Footer from './Footer.vue';
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
    },
    components: {
      Footer,
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
  height: 400px; /* Tu peux ajuster la hauteur en fonction de ce que tu souhaites */
  overflow: hidden;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px); /* Applique un flou à l'image */
  position: absolute;
  top: 0;
  left: 0;
}

.banner h1, .banner p {
  position: absolute;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Ajoute un effet d'ombre pour que le texte soit plus lisible */
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
