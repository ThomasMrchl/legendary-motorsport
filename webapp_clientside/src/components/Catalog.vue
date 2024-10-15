<script>
import carsData from '../data/fake-cars.json';
import usersData from '../data/fake-users.json';
import francesData from '../data/fake-franchises.json';
import CarCard from "./CarCard.vue";
import UserCard from "./UserCard.vue";
import FranchiseCard from "./FranchiseCard.vue";

export default {
  name: 'Catalog',
  components: {
    CarCard,
    UserCard,
    FranchiseCard
  },
  data() {
    return {
      cars: carsData,
      users: usersData,
      franchises: francesData
    };
  }
}
</script>

<template>
  <div class="catalog-wrapper">
    <div class="catalog-container">
      <div class="main-banner">
        <div class="banner">
          <div class="banner-content">

          </div>
          <div class="banner-image">
            <img src="../assets/img/LegendaryBanner.png" alt="Banner Image">
          </div>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="content-container">
          <div class="content-title">
            <img src="../assets/img/LegendaryLogo.png" style="width: 400px;" alt="Legendary Logo">
            <div class="content-title-text">
              <div class="title">CHOOSE FROM OUR TOP END</div>
              <div class="subtitle">HIGH PERFORMANCE CARS AT GREAT PRICES</div>
            </div>
          </div>
          <div class="content-sort-button">
              <div class="sort-button">Sort by Price</div>
          </div>
          <div class="grid-wrapper">
            <div class="grid-container">
              <div class="buttons">
                <button>FEATURED</button>
                <button>2 DOOR</button>
                <button>4 DOOR</button>
                <button>MOTORCYCLES</button>
                <button>SPECIAL</button>
              </div>
              <div class="car-list">
                <CarCard
                  v-for="car in cars"
                  :key="car.id"
                  :model="car.model"
                  :brand="car.brand"
                  :price="car.latest_price"
                  :color="car.color"
                  :status="car.status"
                  :horsepower="car.horsepower"
                />
              </div>
              <div class="user-list">
                <UserCard
                  v-for="user in users"
                  :key="user.email"
                  :firstname="user.first_name"
                  :lastname="user.last_name"
                  :isemployee="user.is_employee"
                  :role="user.role"
                />
              </div>
              <div class="franchise-list">
                <FranchiseCard
                  v-for="franchise in franchises"
                  :key="franchise.franchise_id"
                  :name="franchise.franchise_name"
                  :capacity="franchise.franchise_capacity"
                  :phonenumber="franchise.franchise_phone_number"
                  :openingyear="franchise.franchise_opening_year"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-wrapper {
  box-sizing: border-box;
  max-width: 1200px;
  width: 100%;
  background-color: #240102;
  border: 2px solid #6B0707;
  padding: 20px;
}

.grid-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
}

.car-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.user-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.user-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.catalog-wrapper {
  heith: auto;
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
}

.title {
  color: #990003;
  font-size: 26px;
  font-weight: 600;
  font-family: Helvetica, Sans-Serif;
}

.subtitle {
  color: white;
}

.content-title-text{
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 25px;
}

.content-sort-button {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.sort-button {
  background: linear-gradient(to bottom, #FF4500, #8B0000);
  color: white;
  width: 225px;
  border: 1px solid #5A0000;
  border-radius: 5px;
  padding: 15px 20px;
  font-family: 'Arial';
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 27px;
}

button {
  flex-grow: 1;
  background: linear-gradient(to bottom, #FF4500, #8B0000);
  color: white;
  border: 1px solid #5A0000;
  border-radius: 5px;
  padding: 15px 20px;
  font-family: 'Arial';
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


button:hover {
  background-color: #A52A2A;
}

button.active {
  background-color: #660000;
  border: 2px solid #FF4500;
}
</style>
