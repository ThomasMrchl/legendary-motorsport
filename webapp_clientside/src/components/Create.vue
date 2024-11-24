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
            <h2 v-if="table === 'car'">Create a car</h2>
            <h2 v-else-if="table === 'user'">Create a user</h2>
            <h2 v-else-if="table === 'franchise'">Create a franchise</h2>
          </div>
          <div class="bottom-content" v-if="table === 'car'">
            <p>Please enter the informations of the car.</p>
            <form>
                <label for="Franchise">Franchise:</label>
                <select id="franchise-selection" required>
                    <option value="">-- Please choose a franchise --</option>
                    <option
                    v-for="franchise in franchiselist"
                    :value="franchise.franchise_id">{{ franchise.franchise_name }}</option>
                </select>

                <label for="Condition">Condition:</label>
                <select id="condition-selection" required>
                    <option value="">-- Please choose a condition --</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select>

                <label for="Mileage">Mileage:</label>
                <input type="number" placeholder="10000" id="mileage" min="0" required />

                <label for="Color">Color:</label>
                <input type="text" placeholder="Red" id="color" required />  

                <div id="prices">
                    <label for="buyout">Buyout Price:</label>
                    <input type="number" placeholder="40000" id="buyout" min="0" required />
                    <label for="first">First Price:</label>
                    <input type="number" placeholder="50000" id="first" min="0" required />
                </div>

                <label for="Brand">Brand:</label>
                <input type="text" placeholder="Chevrolet" id="brand" required />

                <label for="Model">Model:</label>
                <input type="text" placeholder="Corvette" id="model" required />

                <label for="Engine Type">Engine Type:</label>
                <select id="enginetype-selection" required>
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
                <input type="number" placeholder="495" id="horsepower" min="0" required />

                <button type="submit">Create</button>
            </form>
          </div>
          <div class="bottom-content" v-if="table === 'user'">
            <p>Please enter the informations of the user.</p>
            <form>
                <label for="First Name">First Name:</label>
                <input type="text" placeholder="John" id="fname" required />

                <label for="Last Name">Last Name:</label>
                <input type="text" placeholder="Doe" id="lname" required />

                <label for="Birthdate">Birthdate:</label>
                <input type="date" id="birthdate" required />

                <label for="Address">Address:</label>
                <select id="address-selection" required>
                    <option value="">-- Please choose an address --</option>
                    <option
                    v-for="address in addresslist"
                    :value="address.id_adress">{{ `${address.street_number} ${address.street}, ${address.postal_code}, ${address.country}` }}</option>
                </select>

                <label for="Email">Email:</label>
                <input type="email" placeholder="example@santosmail.com" id="email" required />

                <label for="Password">Password:</label>
                <input type="password" id="password" required />

                <div id="Employee">
                    <input type="checkbox" id="employee" v-model="isEmployee" required/>
                    <label for="employee">Employee?</label>
                </div>

                <label v-if="isEmployee" for="Role">Role:</label>
                <select v-if="isEmployee" id="role-selection" required>
                    <option value="">-- Please choose a role --</option>
                    <option value="Sales">Sales</option>
                    <option value="Technician">Technician</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="CEO">CEO</option>
                </select>

                <label v-if="isEmployee" for="salary">Yearly Salary:</label>
                <input v-if="isEmployee" type="number" placeholder="99999999" id="salary" min="0" required />

                <button type="submit">Create</button>
            </form>
          </div>
          <div class="bottom-content" v-if="table === 'franchise'">
            <p>Please enter the informations of the franchise.</p>
            <form>

                <label for="Address">Address:</label>
                <select id="address-selection" required>
                    <option value="">-- Please choose an address --</option>
                    <option
                    v-for="address in addresslist"
                    :value="address.id_adress">{{ `${address.street_number} ${address.street}, ${address.postal_code}, ${address.country}` }}</option>
                </select>

                <label for="Owner">Owner:</label>
                <select id="owner-selection" required>
                    <option value="">-- Please choose the owner --</option>
                    <option
                    v-for="user in userlist"
                    v-if="user.is_employee == true"
                    :value="user.id_user">{{ `${user.first_name} ${user.last_name}` }}</option>
                </select>

                <label for="capacity">Capacity:</label>
                <input type="number" placeholder="60" id="capacity" min="1" required />

                <label for="franname">Name:</label>
                <input type="text" placeholder="Yellow Park" id="franname" required />

                <label for="phone">Phone Number:</label>
                <input type="tel" id="phone" placeholder="3312345678" pattern="33[0-9]{8}" required />

                <label for="openingyear">Opening Year:</label>
                <input type="number" id="openingyear" placeholder="2004" min="2000" required />

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
  import franchiselist from "../data/fake-franchises.json";
  import addresslist from "../data/fake-addresses.json";
  import userlist from "../data/fake-users.json";
  export default {
    data() {
        return {
            franchiselist,
            addresslist,
            isEmployee: false,
            userlist
        }
    },
    methods: {
      redirectToRoute(route) {
        this.$router.push(route);
      }
    },
    components: {
      Footer
    },
    props: {
        table: String,
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
  