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
            <h2>Modify a car</h2>
          </div>
          <div class="bottom-content" v-if="table === 'car'">
            <p>Please enter the informations of the car.</p>
            <form @submit.prevent="submitCarForm">
                <label for="Franchise">Franchise:</label>
                <select id="franchise-selection" v-model="car.car_franchise" required>
                  <option
                    v-for="franchise in franchiselist"
                    :value="franchise.franchise_id">
                    {{ franchise.franchise_name }}
                  </option>
                </select>

                <label for="Status">Status:</label>
                <select id="status-selection" v-model="car.car_status" required>
                  <option
                    v-for="status in ['Sold', 'Available']"
                    :value="status">
                    {{ status.charAt(0).toUpperCase() + status.slice(1) }}
                  </option>
                </select>

                <label for="color">Color:</label>
                <input type="text" v-model="car.car_color" id="color" required />

                <label for="Mileage">Mileage:</label>
                <input type="number" v-model="car.car_mileage" id="mileage" min="0" required />

                <label for="Condition">Condition:</label>
                <select id="condition-selection" v-model="car.car_condition" required>
                  <option v-for="cond in ['Excellent', 'Very Good', 'Good', 'Fair']" :value="cond">
                    {{ cond.charAt(0).toUpperCase() + cond.slice(1) }}
                  </option>
                </select>



                <div id="prices">
                    <label for="buyout">Buyout Price:</label>
                    <input type="number" v-model="car.car_initial_price" id="buyout" min="0" required />
                    <label for="first">Selling Price:</label>
                    <input type="number" v-model="car.car_selling_price" id="first" min="0" required />
                </div>

                <label v-if="car.car_status === 'Sold'" for="Buyer">Buyer:</label>
                <select v-if="car.car_status === 'Sold'" id="buyer-selection" v-model="car.car_owner" required>
                  <option
                    v-for="user in userlist"
                    :value="user.user_name">
                    {{ user.user_name }}
                  </option>
                </select>

                <label for="Brand">Brand:</label>
                <input type="text" v-model="car.car_brand" id="brand" required />

                <label for="Model">Model:</label>
                <input type="text" v-model="car.car_model" id="model" required />

                <div class="carimage">
                  <select v-model="car.car_image" required>
                    <option v-for="(url, index) in imageUrls" :key="index" :value="url">
                      Image {{ index + 1 }}
                    </option>
                  </select>

                  <img :src="car.car_image" alt="Selected car image" class="smallimage"/>
                </div>

                <label for="Engine Type">Engine Type:</label>
                <select id="enginetype-selection" v-model="car.car_engine" required>
                  <option
                    v-for="engine in ['Electric', 'Hybrid', 'Diesel', 'Gasoline']"
                    :value="engine">
                    {{ engine.charAt(0).toUpperCase() + engine.slice(1) }}
                  </option>
                </select>

                <label for="Horsepower">Horsepower:</label>
                <input type="number" v-model="car.car_horsepower" id="horsepower" min="0" required />


                <button type="submit">Modify</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </template>

  <script>
  import Footer from "./Footer.vue";
  const axios = require('axios');
  export default {
    data() {
        return {
            franchiselist: [],
            userlist: [],
            imageUrls: [
              require('@/assets/img/car.jpg'),
              require('@/assets/img/car2.jpg'),
              require('@/assets/img/car3.jpg'),
              require('@/assets/img/car4.jpg'),
              require('@/assets/img/car5.jpg'),
              require('@/assets/img/car6.jpg'),
              require('@/assets/img/car7.jpg'),
              require('@/assets/img/car8.jpg'),
              require('@/assets/img/car9.jpg'),
              require('@/assets/img/car10.jpg')
            ],
            car: {
              car_brand: "",
              car_model: "",
              car_horsepower: 0,
              car_mileage: 0,
              car_initial_price: 0,
              car_selling_price: 0,
              car_owner: null,
              car_status: "",
              car_condition: "",
              car_engine: "",
              car_franchise: 1,
              car_color: "",
              car_image: ""
            }
        };
    },
    async created() {
      this.isLoading = true;
      try {
        const response = await axios.get('http://localhost:3000/car/getCarById/' + this.id);
        this.car = response.data.carById[0];
      } catch (error) {
        console.error("Error fetching car:", error);
        this.error = "An error occurred while fetching car details.";
      } finally {
        this.isLoading = false;
      }
    },
    methods: {
        redirectToRoute(route) {
            this.$router.push(route);
        },
        async submitCarForm() {
          try {
              if (!this.id) {
                  alert("Car ID is missing!");
                  return;
              }

              console.log("Updating car with ID:", this.id);
              console.log("Car data:", this.car);

              const response = await fetch(`http://localhost:3000/car/updateCar/${this.id}`, {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(this.car)
              });

              if (response.ok) {
                  const data = await response.json();
                  console.log('Car updated successfully:', data);
                  alert('Car updated successfully!');
                  this.redirectToRoute('/catalog'); // Redirect to the catalog page
              } else {
                  console.error('Error updating car:', response.statusText);
                  const errorData = await response.json();
                  alert(`Error updating car: ${errorData.message}`);
              }
          } catch (error) {
              console.error('Error:', error);
              alert('An unexpected error occurred.');
          }
      },
        async fetchFranchises() {
          try {
            const response = await fetch("http://localhost:3000/franchise/getFranchiseList", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.ok) {
              const data = await response.json();
              this.franchiselist = data.allFranchises;
            } else {
              console.error("Failed to fetch franchises", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching franchises:", error);
          }
        },
        async fetchUsers() {
          try {
            const response = await fetch("http://localhost:3000/user/getAllUsers", {
              method: "GET",
              credentials: 'include',
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.ok) {
              const data = await response.json();
              this.userlist = data.allUsers;
            } else {
              console.error("Failed to fetch users", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        }
    },
    mounted() {
    this.fetchFranchises();
    this.fetchUsers();
  },
    components: {
        Footer,
    },
    props: {
        table: String,
        id: String
    },
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

  .smallimage {
  max-width: 200px;
  height: auto;
  border: 3px solid #8b0000;
  box-shadow: 0 0 10px rgba(255, 69, 0, 0.4);
  border-radius: 10px;
}


.carimage {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
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
