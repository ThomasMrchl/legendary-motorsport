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
            <h2 v-if="table === 'car'">Modify a car</h2>
            <h2 v-else-if="table === 'user'">Modify a user</h2>
            <h2 v-else-if="table === 'franchise'">Modify a franchise</h2>
          </div>
          <div class="bottom-content" v-if="table === 'car'">
            <p>Please enter the informations of the car.</p>
            <form @submit.prevent="submitCarForm">
                <label for="Franchise">Franchise:</label>
                <select id="franchise-selection" v-model="carfranchise" required>
                  <option
                    v-for="franchise in franchiselist" 
                    :value="franchise.franchise_id">
                    {{ franchise.franchise_name }}
                  </option>
                </select>

                <label for="Status">Status:</label>
                <select id="status-selection" v-model="selectedStatus" required>
                  <option
                    v-for="status in ['sold', 'available']" 
                    :value="status" 
                    :selected="status === carstatus">
                    {{ status.charAt(0).toUpperCase() + status.slice(1) }}
                  </option>
                </select>

                <label for="color">Color:</label>
                <input type="text" :value="carcolor" id="color" required />

                <label for="Mileage">Mileage:</label>
                <input type="number" :value=carmileage id="mileage" min="0" required />

                <label for="Condition">Condition:</label>
                <select id="condition-selection" v-model="carcondition" required>
                  <option v-for="cond in ['used', 'new']" :value="cond" :selected="cond === carcondition">
                    {{ cond.charAt(0).toUpperCase() + cond.slice(1) }}
                  </option>
                </select>



                <div id="prices">
                    <label for="buyout">Buyout Price:</label>
                    <input type="number" :value="carbuyout" id="buyout" min="0" required />
                    <label for="first">First Price:</label>
                    <input type="number" :value="carfirst" id="first" min="0" required />
                </div>

                <label v-if="selectedStatus === 'sold'" for="Buyer">Buyer:</label>
                <select v-if="selectedStatus === 'sold'" id="buyer-selection" required>
                  <option
                    v-for="user in userlist" 
                    :value="user.id_user" 
                    :selected="user.id_user === carbuyer">
                    {{ user.first_name + " " + user.last_name }}
                  </option>
                </select>

                <label for="Brand">Brand:</label>
                <input type="text" :value="carbrand" id="brand" required />

                <label for="Model">Model:</label>
                <input type="text" :value="carmodel" id="model" required />

                <label for="Engine Type">Engine Type:</label>
                <select id="enginetype-selection" v-model="carengine" required>
                  <option
                    v-for="engine in ['electric', 'V2', 'V4', 'V6', 'V8', 'V10', 'V12']" 
                    :value="engine">
                    {{ engine.charAt(0).toUpperCase() + engine.slice(1) }}
                  </option>
                </select>

                <label for="Horsepower">Horsepower:</label>
                <input type="number" v-model="carhorsepower" id="horsepower" min="0" required />
 

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
  import franchiselist from "../data/fake-franchises.json";
  import addresslist from "../data/fake-addresses.json";
  import userlist from "../data/fake-users.json";
  import carlist from "../data/fake-cars.json";
  export default {
    data() {
        return {
            franchiselist: franchiselist,
            addresslist: addresslist,
            isEmployee: false,
            userlist: userlist,
            carlist: carlist,
            carid: this.$route.params.id,
            carfranchise: null,
            carstatus: "",
            carcolor: "",
            carmileage: 0,
            carcondition: "",
            carbuyout: 0,
            carfirst: 0,
            carbuyer: null,
            carmodel: "",
            carbrand: "",
            carengine: "",
            carhorsepower: 0,
            carfo: null,
            selectedStatus: "",
        };
    },
    async created() {
      this.isLoading = true;
      try {
        console.log('Car ID:', this.carid);
        const response = await fetch(`http://localhost:3000/car/getCarById/${this.carid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          const car = data.carById[0];
          this.carfranchise = car.franchise_id;
          this.selectedStatus = car.status;
          this.carcolor = car.color;
          this.carmileage = car.mileage;
          this.carcondition = car.condition;
          this.carbuyout = car.buyout_price;
          this.carfirst = car.first_price;
          this.carbuyer = car.buyer_id;
          this.carmodel = car.model;
          this.carbrand = car.brand;
          this.carengine = car.engine_type;
          this.carhorsepower = car.horse_power;
        } else {
          console.error("Failed to fetch car", response.statusText);
          this.error = "Failed to fetch car.";
        }
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
            console.log('Form Data Before Sending:', {
                franchise_id: this.carfranchise,
                status: this.selectedStatus,
                color: this.carcolor,
                mileage: this.carmileage,
                conditions: this.carcondition,
                buyout_price: this.carbuyout,
                first_price: this.carfirst,
                latest_price: this.carfirst,
                model: this.carmodel,
                brand: this.carbrand,
                engine_type: this.carengine,
                horse_power: this.carhorsepower,
                id_car: this.carid,
            });

            const carData = {
                franchise_id: this.carfranchise,
                status: this.selectedStatus,
                color: this.carcolor,
                mileage: this.carmileage,
                conditions: this.carcondition,
                buyout_price: this.carbuyout,
                first_price: this.carfirst,
                latest_price: this.carfirst,
                model: this.carmodel,
                brand: this.carbrand,
                engine_type: this.carengine,
                horse_power: this.carhorsepower,
                id_car: this.carid,
            };
            console.log('Form Data:', carData);
            try {
                const response = await fetch(`http://localhost:3000/car/updateCar/${this.carid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_API_KEY', // Replace with your actual API key
                    },
                    body: JSON.stringify(carData),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Car updated successfully', data);
                } else {
                    console.error('Error updating car: ', response.statusText);
                    const errorData = await response.json();
                    console.log('Error details: ', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
    },
    components: {
        Footer,
    },
    props: {
        table: String,
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
  