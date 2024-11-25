<script>
import {RouterLink} from "vue-router";
export default {
  name: 'CarCard',
  props: {
    id: String,
  },
  data() {
    return {
      car: null,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async fetchCar() {
      this.isLoading = true;
      try {
        const response = await fetch(`http://localhost:3000/car/getCarById/${this.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          this.car = data.carById[0];
        } else {
          console.error("Failed to fetch car", response.statusText);
          this.error = "Failed to fetch car.";
        }
      } catch (error) {
        console.error("Error fetching car:", error);
        this.error = "An error occurred while fetching car details.";
      } finally {
        this.isLoading = false;
      }
    },
    redirectToRoute(route) {
      this.$router.push(route);
    },
  },
  mounted() {
    console.log('Car ID:', this.id);
    this.fetchCar();
  },
};
</script>

<template>
  <div v-if="isLoading" class="loading">Loading car details...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else-if="car" class="car-wrapper">
    <div class="car-card">
      <div class="car-image-wrapper">
        <img
          src="https://jolstatic.fr/upload/gta5/ImagesArticles/PresentationGTAo/importexport.jpg"
          alt="Car image"
          class="car-image"
        />
      </div>

      <!-- Car Details -->
      <div class="car-content">
        <h2 class="car-title">{{ car.brand }} - {{ car.model }}</h2>
        <p class="car-price">💰 <strong>${{ car.latest_price.toLocaleString() }}</strong></p>
        <p class="car-description">
          {{ car.description || "An amazing car with stunning features, perfect for anyone looking for performance and style." }}
        </p>

        <!-- Additional Details -->
        <div class="car-details">
          <p><strong>Color:</strong> {{ car.color }}</p>
          <p><strong>Status:</strong> {{ car.status }}</p>
          <p><strong>Horsepower:</strong> {{ car.horsepower }} HP</p>
        </div>

        <!-- Action Buttons -->
        <div class="car-actions">
          <div v-if="car.status !== 'Sold'">
            <button class="buy-button">Buy Now</button>
          </div>
          <RouterLink :to="`/modify/car/${id}`">
            <button class="info-button">Modify</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card-wrapper {
  background-color: #240102;

}

.car-card {
  border: 5px solid #8C110F;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  margin: 1rem auto;
  background-color: #48130E;
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.car-card:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.car-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.car-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.car-card:hover .car-image {
  transform: scale(1.1);
}

.car-content {
  padding: 1.5rem;
  text-align: center;
  color: white;
}

.car-content h2 {
  color: white;
}

.car-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.car-price {
  font-size: 1.2rem;
  color: #27ae60;
  margin-bottom: 1rem;
}

.car-description {
  font-size: 1rem;
  color: white;
  margin-bottom: 1.5rem;
}

.car-details {
  font-size: 0.9rem;
  color: white;
  margin-bottom: 1.5rem;
}

.car-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.buy-button,
.info-button {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.buy-button {
  background-color: #27ae60;
  color: #fff;
}

.buy-button:hover {
  background-color: #219150;
}

.info-button {
  background-color: #f0f0f0;
  color: #333;
}

.info-button:hover {
  background-color: #e1e1e1;
}
</style>
