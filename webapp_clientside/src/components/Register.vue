<template>
    <div class="create-wrapper">
      <div class="create-container">
        <div class="content">
          <div class="top-content">
            <img
              @click="redirectToRoute('/')"
              class="logo"
              :src="require('@/assets/img/LegendaryLogo2.png')"
              alt="Logo Legendary Motorsport"
            />
            <h2>Register</h2>
          </div>
          <div class="bottom-content">
            <p>Please enter your informations.</p>
            <form @submit.prevent="submitRegister">

              <label for="First Name">First Name:</label>
              <input type="text" placeholder="Michael" id="firstname" v-model="user.first_name" required />

              <label for="Last Name">Last Name:</label>
              <input type="text" placeholder="De Santa" id="lastname" v-model="user.last_name" required />

              <label for="Birthdate">Birthdate:</label>
              <input type="date" id="bdate" v-model="user.birth_date" required />

              <label for="Email">Email:</label>
              <input type="email" placeholder="desanta.michael@eyefind.info" id="email" v-model="user.email" required />

              <label for="Password">Password:</label>
              <input type="password" id="Password" v-model="user.password" required />
  
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import Footer from "./Footer.vue";
  export default {
    data() {
      return {
        user: {
          first_name: "",
          last_name: "",
          birth_date: "",
          email: "",
          password: "",
          is_employee: false,
          role: "Customer",
          yearly_salary: null
        }
      };
    },
    props: {
      table: String,
    },
    components: {
      Footer
    },
    methods: {
      redirectToRoute(route) {
        this.$router.push(route);
      },
      async submitRegister() {
        try {
          console.log("Payload being sent:", this.user);  
          const response = await fetch("http://localhost:3000/user/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.user)
          });
  
          if (response.ok) {
            const result = await response.json();
            alert("You have successfully been registered !");
            this.redirectToRoute("/catalog");
          } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
          }
        } catch (err) {
          console.error("Error submitting your registration:", err);
          console.log(JSON.stringify(this.user));
          alert("Failed to register. Please try again later.");
        }
      }
    }
  };
  </script>
  
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
  
  .create-wrapper {
    background: linear-gradient(135deg, #48130e, #320505);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 100px;
    gap: 100px;
  }
  
  .create-container {
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
  
  #prices input {
    width: 25%;
    height: auto;
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
  input[type="number"],
  input[type="date"],
  input[type="email"],
  input[type="password"],
  input[type="tel"] {
    padding: 0.75rem;
    border-radius: 10px;
    border: 2px solid #8b0000;
    background-color: #1e1e1e;
    color: #ffffff;
    transition: border 0.3s, box-shadow 0.3s;
  }
  
  select {
    padding: 0.75rem;
    border-radius: 10px;
    border: 2px solid #8b0000;
    background-color: #1e1e1e;
    color: #ffffff;
    transition: border 0.3s, box-shadow 0.3s;
  }
  
  input[type="text"]:focus,
  input[type="number"]:focus,
  input[type="date"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus,
  input[type="tel"]:focus {
    border-color: #ff4500;
    box-shadow: 0 0 10px rgba(255, 69, 0, 0.4);
    outline: none;
  }
  
  button {
    background: linear-gradient(135deg, #ff4500, #8b0000);
    color: #ffffff;
    border: none;
    border-radius: 10px;
    padding: 0.75rem;
    cursor: pointer;
    font-size: 1rem;
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
  