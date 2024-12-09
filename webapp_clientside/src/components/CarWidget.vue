<script>
export default {
  name: 'CarWidget',
  props: {
    model: String,
    brand: String,
    price: Number,
    color: String,
    id: String
  },
  methods: {
    redirectToRoute(route) {
      this.$router.push(route);
    }
  }
}
</script>

<template>
  <div class="car-card">
    <div class="top-banner">
      <p>{{ brand }} {{ model }}</p>
    </div>
    <div class="bottom-banner">
      <p>Color: {{ color }} | Bought: {{ price }}$</p>
      <button @click="redirectToRoute('/car/' + id)">Further Informations</button>
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
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>

