<template>
  <div class="hello">
    <p>ACTION = {{action}}<br>ID = {{id}}
      <a href="/#/cars/list/all">Back to the list</a>
      <a href="/#/cars/edit/0">Add a new car</a>
    </p>

    <table v-if="action === 'show'">

    </table>

    <table v-if="action === 'edit'">

    </table>

    <table v-if="action === 'list'">

    </table>
  </div>
</template>

<script>
export default {
  name: 'Cars',
  props: ['action', 'id'],
  data () {
    return {
      cars: [],
      brands: [],
      oneCar: {
        car_id: 0,
        car_brand: '',
        car_name: ''
        }
    }
  },
  methods: {
    async fetchCars () {
      let response = await fetch('http://localhost:3000/cars');
      let data = await response.json();
      this.cars = data;
    }
  }
}
</script>


<style scoped>
#app table {
  width: 95%; margin: 20px;
}
#app id {
  text-align: left;
}
</style>
