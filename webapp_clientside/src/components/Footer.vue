<template>
  <footer class="footer">
    <img class="seller" :src="require('@/assets/img/women.png')" alt="Seller image">
    <div class="footer-content">
      <div>
        <RouterLink to="/"><img class="logo" :src="require('@/assets/img/LegendaryLogo2.png')" alt="Logo Legendary Motorsport"></RouterLink>
        <p class="footer-description">The most <span class="red">luxuous</span> and <span class="red">self-confident</span> cars of Los Santos.</p>
        <nav class="footer-nav">
          <ul>
            <li><a href="/catalog/0"><button>CATALOG</button></a></li>
            <li><a href="/login"><button>LOGIN</button></a></li>
          </ul>
        </nav>
        <div class="footer-bottom">
          <p>&copy; 2024 <span class="red">Legendary Motorsport</span>. All rights reserved.</p>
        </div>
      </div>
    </div>
    <img class="seller" :src="require('@/assets/img/seller.png')" alt="Seller image">
  </footer>
</template>

<script setup>

</script>

<style scoped>
.footer {
  padding-top: 25px;
  background-color: #560D0D;
  color: white;
  text-align: center;
  border-top: 3px solid #b91c19;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 25px;
  width: 100%;
}

.red {
  color: #b91c19;
}

.logo {
  width: 40%;
  height: auto;

  &:hover {
    cursor: pointer;
  }
}

.footer-content {

}

.seller {
  height: 250px;
  width: auto;
}

.footer-description {
  font-size: 16px;
  margin-bottom: 20px;
}

.footer-nav ul {
  list-style: none;
  padding: 0;
}

.footer-nav li {
  display: inline;
}

.footer-nav a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-nav a:hover {
  color: #b91c19;
}

.footer-bottom {
  margin-top: 20px;
  font-size: 14px;
}

button {
  background: linear-gradient(to bottom, #FF4500, #8B0000);
  color: white;
  border: 1px solid #5A0000;
  border-radius: 3px;
  padding: 15px 20px;
  font-family: 'Arial';
  width: 150px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: white;
    color: black;
  }
}



</style>
