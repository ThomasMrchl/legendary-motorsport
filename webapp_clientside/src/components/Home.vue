<template>
  <div class="whole">
    <section class="banner">
      <img class="bg" :src="require('@/assets/img/carbanner.jpg')" alt="Orange Car">
      <img class="logo" :src="require('@/assets/img/LegendaryLogo.png')" alt="Logo Legendary Motorsport">
      <p>TOP END <span class="red">HIGH PERFORMANCE CARS</span> AT GREAT PRICES</p>
      <a href="/catalog/2"><button>CATALOG</button></a>
    </section>
    <section class="background">
      <section class="content-section">
        <section class="text-container">
          <div class="title">LUXURY CARS JUST FOR YOU !</div>
          <p>Are you looking for a safe, eco-friendly, fuel-efficient car that's practical for getting around town? <span class="red">You're on the wrong website</span>. Are you looking to have them dripping as you pass by? Welcome! You're in a safe place. </p>
        </section>
        <img :src="require('@/assets/img/gta5garage.png')" alt="Image of a Garage with cars">
      </section>
      <section class="content-section">
        <img id="rd" :src="require('@/assets/img/map(2).png')" alt="Map of Legendary Motorsport franchises">
        <section class="text-container">
          <div class="title">ALWAYS CLOSE TO YOU !</div>
          <p>You're angry because your ex is showing off in the newest ferrari of her boyfriend ? Fuck off ! Come quickly get a pure beauty of metal and ride to paradise. With our huge collection of franchises, Legendary Motorsport is always 3 footsteps near. </p>
          <hr class="ligne-separation">
          <p>It's like a tree falling in the woods. Or thousands of trees falling on 3000 acres where you're building a private golf course. If you're rich, and nobody knows you're rich, are you really rich? (um, the answer is "no", but if you have to ask, then you're not really rich, either way, because you're an idiot.) Accessorize your awesome life the right way. With an <span class="red">expensive, dangerously fast supercar</span> nobody will insure and that decreases massively in value with every mile. Just so people know about you.</p>
        </section>
      </section>
      <section class="content-section">
        <section class="text-container">
          <div class="title">BUY IT OR LEAVE !</div>
          <p>We sell <span class="red">exotic, ostentatious, high-performance</span> vehicles to <span class="red">exotic, ostentatious, high-performance</span> people. If your net worth consists of less than eight figures, please feel free to browse and fantasize about what could have been.</p>
        </section>
        <img :src="require('@/assets/img/cartag.jpg')" alt="A beautiful tagged black car">
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

.red {
  color: #b91c19;
}

button {
  z-index: 20;
  position: relative;
  top: 400px;
  left: 650px;
  background: linear-gradient(to bottom, #FF4500, #8B0000);
  color: white;
  border: 1px solid #5A0000;
  border-radius: 5px;
  padding: 15px 20px;
  font-family: 'Arial',serif;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.ligne-separation {
  height: 1px; /* Épaisseur de la ligne */
  background-color: #b91c19; /* Couleur blanche */
  margin: 20px 0; /* Espace autour de la ligne */
  border: none;
}


.whole {
  background-color: black;
}

.banner {
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  border-top: 10px solid #48130E;
  border-bottom: 5px solid #8C110F;
}

.bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px); /* Applique un flou à l'image */
  position: absolute;
  top: 0;
  left: 0;
}

.banner p {
  position: relative; /* Change to relative so it flows with the button */
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px; /* Add margin to create space between text and button */
}

.background {
  background: linear-gradient(135deg, #000000, #1c1c1c, #333333);
  opacity: 1; /* Remettre à 1 pour ne pas affecter l'opacité des éléments internes */
  z-index: -1; /* Place l'arrière-plan derrière tout le reste */
}

img :hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.banner .logo {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  width: 30%;
  height: auto;
}

.banner p {
  font-size: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}

.title {
  font-size: 24px;
  top: 50%;
  left: 50%;
  margin: 0;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.content-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  gap: 20px;
}

#rd {
  max-width: 30%;
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
  font-size: 1.1rem;
  line-height: 1.6;
  color: white;
}

.content-section img {
  max-width: 60%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 0 1 400px;
  transition: box-shadow 0.3s ease-in-out; /* Transition added for smooth hover effect */
}

.content-section img:hover {
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.4); /* Shadow effect on hover */
}

@media (max-width: 768px) {
  .content-section {
    flex-direction: column;
    text-align: center;
  }

  .content-section img {
    margin-top: 20px;
  }

  .text-container {
    padding-right: 0;

  }

}

</style>
