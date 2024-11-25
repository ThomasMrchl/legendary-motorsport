<script>
export default {
  name: 'CarCard',
  props: {
    id: Number,
    franchise_id: Number,
    mileage: Number,
    condition: String,
    engine: String,
    model: String,
    brand: String,
    price: Number,
    color: String,
    status: String,
    horsepower: Number
  }
}
</script>

<template>
  <div class="car-card">
    <RouterLink :to="`/car/${id}`">
    <div class="top-banner">
      <p>DEALERSHIP NAME</p>
    </div>
    <div class="car-image">
      <img :src="require('@/assets/img/car.jpg')" :alt="`${brand} ${model}`" />
    </div>
    <div class="bottom-banner">
      <p>{{ brand }} {{ model }}</p>
      <button>${{price}}</button>
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
  height: auto;
}

button {
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

</style>

