<script>
import Footer from "../components/Footer.vue";
import CarWidget from "./CarWidget.vue";
const axios = require('axios');
export default {
  data() {
    return {
        carlist: [],
        userlist: [],
        addressString: "",
        user: {
            user_name: "",
            user_email: "",
            user_birthdate: "",
            user_firstname: "",
            user_lastname: "",
            user_created: "",
            user_role: "",
            user_address: ""
        }
    };
  },
  methods: {
    setDate() {
        const date = new Date(this.user.user_created);
        this.user.user_created = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    },
    async getUser() {
    try{
        const response = await axios.get('http://localhost:3000/user/getUserbyName');
        this.user = response.data.user[0];
        if (this.user.user_address){
          this.getAddress(this.user.user_address);
        }
        if (this.user.user_role == 'ADMIN'){this.getUsers();}
        this.setDate();
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
    },
    async getCarsOwned() {
    try{
        const response = await axios.get('http://localhost:3000/car/getCarsByOwner');
        if (response.data.carsByOwner){
            this.carlist = response.data.carsByOwner;
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
    },
    async getAddress(id) {
    try{
        const response = await axios.get('http://localhost:3000/address/getAddressById/' + id);
        const address = response.data.address;
        this.addressString = `${address.address_number} ${address.address_street}, ${address.address_postalcode} ${address.address_city}, ${address.address_country}`;
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
    },
    async getUsers() {
    try{
        const response = await axios.get('http://localhost:3000/user/getAllUsers');
        this.userlist = response.data.allUsers;
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
    },
redirectToRoute(route) {
      this.$router.push(route);
    },
    async logOut() {
      try {
        const response = await fetch("http://localhost:3000/auth/logout", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          this.redirectToRoute('/catalog');
        } else {
          console.error("Failed to logout:", response.statusText);
        }
      } catch (error) {
        console.error("Error logging out:", error);
        this.error = "Failed to check logout.";
      }
    },
    async updateUser() {
        const { user_firstname, user_lastname, user_birthdate } = this.user;

        try {
            const response = await fetch(`http://localhost:3000/user/updateUser`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_firstname,
                    user_lastname,
                    user_birthdate
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                this.$router.go(0);
            } else {
                const errorData = await response.json();
                console.error("Failed to update user:", errorData.message);
                this.error = errorData.message;
            }
        } catch (error) {
            console.error("Error updating user:", error);
            this.error = "Failed to update user.";
        }
    }
  },
  mounted() {
    this.setDate();
    this.getCarsOwned();
    this.getUser();
  },
  components: {
    Footer,
    CarWidget
  }
}
</script>

<template>
    <div class="catalog-wrapper">
        <div class="catalog-container">
            <div class="main-banner">
                <div class="banner">
                    <div class="banner-content"></div>
                    <div class="banner-image">
                        <img src="../assets/img/LegendaryBanner.png" alt="Banner Image" />
                    </div>
                </div>
            </div>
            <div class="content-wrapper">
                <div class="content-container">
                    <div class="content-title" @click="redirectToRoute('/')">
                        <img
                            src="../assets/img/LegendaryLogo.png"
                            style="width: 400px;"
                            alt="Legendary Logo"
                        />
                        <div class="content-title-text">
                            <div class="title">CHOOSE FROM OUR TOP END</div>
                            <div class="subtitle">
                                HIGH PERFORMANCE CARS AT GREAT PRICES
                            </div>
                        </div>
                    </div>
                    <div class="grid-wrapper">
                        <div class="row">
                            <div class="column">
                                <img src="../assets/img/user.jpg" class="profile-picture" alt="Profile Picture">
                                <div class="welcome">WELCOME, <span class="red">{{ user.user_name }}</span></div>
                                <div class="user-info">
                                    <div class="de">ACCOUNT CREATED: <span class="red">{{ user.user_created }}</span></div>
                                    <div class="de">EMAIL ADDRESS: <span class="red">{{ user.user_email }}</span></div>
                                </div>
                            </div>
                            <div class="separator"></div>
                            <div class="column">
                                <form @submit.prevent="updateUser()">
                                    <label for="firstname">First Name:</label>
                                    <input type="text" id="firstname" v-model="user.user_firstname" required />

                                    <label for="lastname">Last Name:</label>
                                    <input type="text" id="lastname" v-model="user.user_lastname" required />

                                    <label for="birthdate">Birthdate:</label>
                                    <input type="date" id="birthdate" v-model="user.user_birthdate" required />

                                    <div class="address">
                                      <label for="address">Address:</label>
                                      <input type="text" id="address" v-model="addressString" required disabled/>
                                      <button type="button" @click="redirectToRoute('/create/address')">Create</button>
                                    </div>

                                    <div class="buttons">
                                        <button type="submit">Save Changes</button>
                                        <button type="button" @click="logOut()">Log Out</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="Ownedcars" v-if="carlist.length > 0"><div class="textcars">LIST OF <span class="red">OWNED</span> CARS:</div></div>
                        <section class="card-section" v-if="carlist.length > 0">
                            <div class="franchise-list" v-if="carlist.length > 0">
                            <CarWidget
                                v-for="car in carlist"
                                :key="car.car_id"
                                :brand="car.car_brand"
                                :model="car.car_model"
                                :price="car.car_selling_price"
                                :color="car.car_color"
                                :id="car.car_id"
                            />
                            </div>
                        </section>
                        <div class="Ownedcars" v-if="user.user_role === 'ADMIN'"><div class="textcars">LIST OF <span class="red">USERS</span></div></div>
                        <div class="table-container" v-if="user.user_role === 'ADMIN'">
                          <table class="user-table">
                            <thead>
                              <tr>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Birthdate</th>
                                <th>Email</th>
                                <th>Role</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="user in userlist">
                                <td>{{ user.user_name }}</td>
                                <td>{{ user.user_firstname }}</td>
                                <td>{{ user.user_lastname }}</td>
                                <td>{{ user.user_birthdate }}</td>
                                <td>{{ user.user_email }}</td>
                                <td>{{ user.user_role }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped>

.table-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 2px solid #8b0000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #3e3e3e;
}

.address {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

#address {
  min-width: 300px;
}

.user-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    font-size: 16px;
}

.user-table th, .user-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #1e1e1e;
}

td {
  color: white;
}

.user-table th {
    background: linear-gradient(135deg, #ff4500, #8b0000);
    color: #fff;
}

.user-table tr:hover {
    background-color: #1e1e1e;
}

.user-table tr:nth-child(even) {
    background-color: #1e1e1e;
}


@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.Ownedcars {
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
  font-size: 30px;
}

.card-section {
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;

  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.buttons {
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
}

label {
  font-size: 0.9rem;
  color: #ff4500;
}

select {
  padding: 0.75rem;
  border-radius: 10px;
  border: 2px solid #8b0000;
  background-color: #1e1e1e;
  color: #ffffff;
  transition: border 0.3s, box-shadow 0.3s;
}

input[type="text"],
input[type="date"] {
  padding: 0.75rem;
  border-radius: 10px;
  border: 2px solid #8b0000;
  background-color: #1e1e1e;
  color: #ffffff;
  transition: border 0.3s, box-shadow 0.3s;
}

button {
  background: linear-gradient(135deg, #ff4500, #8b0000);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  width: 50%;
  height: auto;
}

button:hover {
  background: linear-gradient(135deg, #ff5733, #a00000);
}

input[type="text"]:focus,
input[type="date"]:focus {
  border-color: #ff4500;
  box-shadow: 0 0 10px rgba(255, 69, 0, 0.4);
  outline: none;
}

select:focus {
  border-color: #ff4500;
  box-shadow: 0 0 10px rgba(255, 69, 0, 0.4);
  outline: none;
}

.separator {
  min-height: 50vh;
  width: 1px;
  background-color: #990003; /* Ligne rouge */
  height: 100%; /* Hauteur de la ligne égale à la hauteur des colonnes */
  margin: 0 20px; /* Espacement des colonnes */
}

.profile-picture {
  width: 170px; /* Ajuste la taille de l'image */
  height: 170px; /* Assure que l'image est carrée */
  border-radius: 50%; /* Rend l'image ronde */
  object-fit: cover; /* S'assure que l'image s'adapte sans déformation */
  border: 5px solid #6B0707; /* Optionnel : ajoute une bordure rouge */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optionnel : ajoute une ombre */
}

.row {
    display: flex;
    flex-direction: row;
}

.column {
    float: left;
    display: flex;
    width: 66.6%;
    flex-direction: column;
    color: white;
    gap: 30px;
    justify-content: center;
    align-items: center;
}

.grid-wrapper {
  box-sizing: border-box;
  max-width: 1200px;
  width: 100%;
  background-color: #240102;
  border: 2px solid #6B0707;
  padding: 20px;
}

.catalog-wrapper {
  height: auto;
  background-color: #48130E;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.catalog-container {
  flex-direction: column;
  display: flex;
  width: 100%;
}

.main-banner {
  border-top: 10px solid #48130E;
  border-bottom: 5px solid #8C110F;
  width: 100%;
}

.banner {
  display: flex;
  height: 400px; /* Adjust as needed */
  position: relative;
  overflow: hidden;
  justify-content: center; /* Center the content horizontally */
}

.banner-content {
  flex: 0 0 30%; /* Left side takes 30% of the width */
  background-color: black; /* Black background for the left side */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.banner-image {
  flex: 0 0 70%; /* Right side takes 70% of the width */
  position: relative;
  overflow: hidden;
}

.banner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, black 0%, transparent 30%, transparent 70%, black 100%);
  /* Gradient fades from black to transparent in the middle and back to black on the right */
}

.content-wrapper {
  position: relative;
  top: -320px;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  display: flex;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
}

.content-title {
  color: white;

  &:hover{
    cursor: pointer;
  }
}

.subtitle {
  color: white;
}

.red {
    color: #990003;
    text-transform: uppercase;
}

.title {
  color: #990003;
  font-size: 26px;
  font-weight: 600;
  font-family: Helvetica, Sans-Serif;
}

</style>
