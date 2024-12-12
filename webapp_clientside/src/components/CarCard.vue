<script>
export default {
  name: 'CarCard',
  data () {
    return {
      franchise_name: ""
    }
  },
  props: {
    car_id: Number,
    car_franchise: Number,
    car_mileage: Number,
    car_condition: String,
    car_engine: String,
    car_model: String,
    car_brand: String,
    car_selling_price: Number,
    car_color: String,
    car_status: String,
    car_horsepower: Number,
    car_image: String
  },
  methods: {
    async fetchFranchiseName(id) {
      try {
        const response = await fetch("http://localhost:3000/franchise/getFranchiseName/" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          this.franchise_name = data.franchiseName;
        } else {
          console.error("Failed to fetch franchises", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching franchises:", error);
      }
    }
  },
  mounted() {
    this.fetchFranchiseName(this.car_franchise);
  }
};
</script>

<template>
  <div class="car-card">
    <RouterLink :to="`/car/${car_id}`">
    <div class="top-banner">
      <p>{{ franchise_name }}</p>
    </div>
    <div class="car-image">
      <img :src="car_image" :alt="`${car_brand} ${car_model}`" />
    </div>
    <div class="bottom-banner">
      <p>{{ car_brand }} {{ car_model }}</p>
      <button class="greenbutton" v-if="car_status === 'Available'">${{car_selling_price}}</button>
      <button class="redbutton" v-else>${{car_selling_price}}</button>
    </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.top-banner {
  padding-left: 15px;
  background-color: white;
  color: black;
}

.bottom-banner {
  padding-left: 15px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;

  background-color: black;
  color: white;
}

.car-card {
  display: flex;
  flex-direction: column;

  &:hover{
    cursor: pointer;
  }
}

.car-image img {
  width: 100%;
  height: 200px;
}

.redbutton {
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

.greenbutton {
  background: linear-gradient(to bottom, #56ff3c, #04d61981);
  color: white;
  border: 1px solid #5A0000;
  border-radius: 5px;
  padding: 15px 20px;
  font-family: 'Arial';
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

</style>

