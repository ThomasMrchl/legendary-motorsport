<template>
  <div>
    <p>The official Legendary Motorsport website.</p>
    <router-link to="/catalog/4">Catalog</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to the Legendary Motorsport website.',
    }
  }
}
</script>

<style scoped>

</style>
