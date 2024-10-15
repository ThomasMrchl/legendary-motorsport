<script>
export default {
  name: 'UserCard',
  props: {
    firstname: String,
    lastname: String,
    isemployee: Boolean,
    role: String
  }
}
</script>

<template>
  <div class="car-card">
    <div class="top-banner">
      <p>{{firstname}} {{lastname}}</p>
    </div>
    <div class="bottom-banner">
      <p>{{isemployee ? "Employee" : "Not employee"}}</p>
      <button>{{role}}</button>
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

