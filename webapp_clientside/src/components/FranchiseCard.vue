<script>
export default {
  name: 'CarCard',
  props: {
    name: String,
    capacity: Number,
    phonenumber: Number,
    openingyear: Number,
    cars: Number
  }
}
</script>

<template>
  <div class="car-card">
    <div class="top-banner">
      <p>Legendary Motorsport : {{name}}</p>
    </div>
    <div class="bottom-banner">
      <p v-if="cars > 1">{{cars}} vehicules listed / {{capacity}} maximum.</p>
      <p v-else>{{cars}} vehicule listed / {{capacity}} maximum.</p>
      <button>Since {{openingyear}}</button>
    </div>
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
  width: 800px;
}

button {
  background: linear-gradient(to bottom, #FF4500, #8B0000);
  color: white;
  border: 1px solid #5A0000;
  border-radius: 5px;
  padding: 15px 20px;
  font-family: 'Arial';
  font-size: 14px;
  transition: background-color 0.3s ease;
}
</style>

