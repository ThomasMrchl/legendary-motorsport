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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
export default {
  name: 'Catalog',
  data() {
    return {}
  }
}
</script>

<style scoped>
.catalog-wrapper {
  height: 100vh;
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
  max-width: 1600px;
  width: 100%;
  display: flex;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.content-title {
  color: white;
  margin-left: 250px;
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
</style>
