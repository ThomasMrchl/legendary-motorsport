<template>
  <div>
    <section class="banner">
      <img :src="require('@/assets/img/carbanner.jpg')">
      <h1>Legendary Motorsport</h1>
      <h4>Your favorite legendary cars</h4>
    </section>
    <section class="parta">
      <section class="text-container">
        <h2>Luxury cars just for you !</h2>
        <p>Are you looking for a safe, eco-friendly, fuel-efficient car that's practical for getting around town? You're on the wrong website. Are you looking to have them dripping as you pass by? Welcome! You're in a safe place. </p>
      </section>
      <img :src="require('@/assets/img/gta5garage.png')">
    </section>
    <section class="parta">
      <img id="rd" :src="require('@/assets/img/map(2).png')">
      <section class="text-container">
        <h2>Wherever you are we are close !</h2>
        <p>You're angry because your ex is showing off in the newest ferrari of her boyfriend ? Fuck off ! Come quickly get a pure beauty of metal and ride to paradise. With our huge collection of franchises, Legendary Motorsport is always 3 footsteps near. </p>
      </section>
    </section>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home',
    }
  }
}
</script>

<style scoped>

div {
  background-color: #510A08;
  border-bottom: #510A08;
}

.banner {
  position: relative;
  width: 100%;
  height: 400px; /* Tu peux ajuster la hauteur en fonction de ce que tu souhaites */
  overflow: hidden;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px); /* Applique un flou à l'image */
  position: absolute;
  top: 0;
  left: 0;
}

.banner h1, .banner h4 {
  position: absolute;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Ajoute un effet d'ombre pour que le texte soit plus lisible */
}

.banner h1 {
  font-size: 48px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}

.banner h4 {
  font-size: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}

.parta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  gap: 20px;
}

#rd {
  max-width: 40%;
}

/* Group h2 and p inside the text-container */
.text-container {
  flex: 1;
  padding-right: 20px;
}

.text-container h2 {
  font-size: 2rem;
  color: white;
  margin-bottom: 10px;
}

.text-container p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: white;
}

.parta img {
  max-width: 60%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 0 1 400px;
}

@media (max-width: 768px) {
  .parta {
    flex-direction: column;
    text-align: center;
  }

  .parta img {
    margin-top: 20px;
  }

  .text-container {
    padding-right: 0;
  }
}

</style>
