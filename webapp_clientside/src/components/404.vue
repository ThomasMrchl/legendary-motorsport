<script>
import {RouterLink} from 'vue-router'
</script>

<template>

<div class="page-wrapper">
    <div class="error-container">
        <RouterLink class="logo" to="/">
            <img
            class="logoimg"
            :src="require('@/assets/img/LegendaryLogo2.png')"
            alt="Logo Legendary Motorsport"
            />
        </RouterLink>
        <div class="bottom">
            <div class="text"><span class="red">404</span> ERROR</div>
            <div class="desc">Looks like you took the <span class="red">wrong path</span>. Go mind your <span class="red">own business</span>.</div>
            <img src="@/assets/img/404.png" class="errorimage">
        </div>
    </div>
</div>


</template>

<style scoped>

.page-wrapper {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background-color: #320505;
}

.error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3vh;
}


.text {
  font-size: 6vh;
  text-align: center;
  color: #ffffff;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
}

.red {
    color: #8C110F;
}

.desc {
  font-size: 3vh;
  text-align: center;
  color: #ffffff;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
}

.logo {
    height: auto;
    align-items: center;
    padding-top: 2.8vh;
}

.logoimg {
    width: 400px;
    height: auto;
}

.logo:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.bottom {
    gap: 1vh;
    flex-direction: column;
    display: flex;
    align-items: center;
}

.errorimage {
    width: 60%;
    height: auto;
}

</style>