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
          <h2>Create a car</h2>
        </div>
        <div class="bottom-content" v-if="table === 'car'">
          <p>Please enter the informations of the car.</p>
          <form @submit.prevent="submitCar">
            <label for="Franchise">Franchise:</label>
            <select id="franchise-selection" v-model="car.franchise_id" required>
              <option value="">-- Please choose a franchise --</option>
              <option
                v-for="franchise in franchiselist"
                :key="franchise.franchise_id"
                :value="franchise.id_franchise">
                {{ franchise.franchise_name }}
              </option>
            </select>

            <label for="Condition">Condition:</label>
            <select id="condition-selection" v-model="car.conditions" required>
              <option value="">-- Please choose a condition --</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>

            <label for="Mileage">Mileage:</label>
            <input type="number" placeholder="10000" id="mileage" v-model="car.mileage" min="0" required />

            <label for="Status">Status:</label>
            <input type="text" placeholder="Available" id="status" v-model="car.status" required />

            <label for="Color">Color:</label>
            <input type="text" placeholder="Red" id="color" v-model="car.color" required />

            <div id="prices">
              <label for="buyout">Buyout Price:</label>
              <input type="number" placeholder="40000" id="buyout" v-model="car.buyout_price" min="0" required />
              <label for="first">First Price:</label>
              <input type="number" placeholder="50000" id="first" v-model="car.first_price" min="0" required />
            </div>

            <label for="Brand">Brand:</label>
            <input type="text" placeholder="Chevrolet" id="brand" v-model="car.brand" required />

            <label for="Model">Model:</label>
            <input type="text" placeholder="Corvette" id="model" v-model="car.model" required />

            <label for="Engine Type">Engine Type:</label>
            <select id="enginetype-selection" v-model="car.engine_type" required>
              <option value="">-- Please choose an engine type --</option>
              <option value="electric">Electric</option>
              <option value="V2">V2</option>
              <option value="V4">V4</option>
              <option value="V6">V6</option>
              <option value="V8">V8</option>
              <option value="V10">V10</option>
              <option value="V12">V12</option>
            </select>

            <label for="Horsepower">Horsepower:</label>
            <input type="number" placeholder="495" id="horsepower" v-model="car.horse_power" min="0" required />

            <button type="submit">Create</button>
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
      franchiselist: [],
      isEmployee: false,
      car: {
        franchise_id: "",
        conditions: "",
        mileage: 0,
        color: "",
        buyout_price: 0,
        first_price: 0,
        latest_price: 0,
        model: "",
        brand: "",
        status: "",
        engine_type: "",
        horse_power: 0
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
    async submitCar() {
      try {
        this.car.latest_price = this.car.first_price;
        const response = await fetch("http://localhost:3000/car/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.car)
        });

        if (response.ok) {
          const result = await response.json();
          alert("Car created successfully!");
          this.redirectToRoute("/catalog");
        } else {
          const error = await response.json();
          alert(`Error: ${error.message}`);
        }
      } catch (err) {
        console.error("Error submitting car:", err);
        alert("Failed to create the car. Please try again later.");
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
          console.log(this.franchiselist);
        } else {
          console.error("Failed to fetch franchises", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching franchises:", error);
      }
    }
  },
  mounted() {
    this.fetchFranchises();
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
