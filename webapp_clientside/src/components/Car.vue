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
      loggedIn: false,
      role: ""
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
    async checkStatus() {
      try {
        const response = await fetch("http://localhost:3000/auth/session-status", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          this.loggedIn = data.loggedIn;
          this.role = data.user.user_role;
        } else {
          console.error("Failed to check session status:", response.statusText);
        }
      } catch (error) {
        console.error("Error checking session status:", error);
        this.error = "Failed to check login status.";
      }
    },
    async deleteCar() {
      if (!confirm("Are you sure you want to delete this car?")) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/car/deleteCar/${this.id}`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          alert("Car successfully deleted!");
          this.redirectToRoute('/catalog');
        } else {
          console.error("Failed to delete car", response.statusText);
          alert("Failed to delete the car. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting car:", error);
        alert("An error occurred while deleting the car.");
      }
    },
    async buyCar() {
      if (!confirm("Are you sure you want to buy this car?")) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/car/buyCar/${this.id}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          alert("Car successfully bought!");
          this.redirectToRoute('/user');
        } else {
          console.error("Failed to buy car", response.statusText);
          alert("Failed to buy the car. Please try again.");
        }
      } catch (error) {
        console.error("Error buying car:", error);
        alert("An error occurred while buying the car.");
      }
    },
    redirectToRoute(route) {
      this.$router.push(route);
    },
  },
  mounted() {
    console.log('Car ID:', this.id);
    this.fetchCar();
    this.checkStatus();
  },
};
</script>

<template>
  <div class="car-wrapper">
    <div class="car-card">
      <div class="car-image-wrapper">
        <img
          :src="car.car_image"
          alt="Car image"
          class="car-image"
        />
      </div>

      <div class="car-content">
        <h2 class="car-title">{{ car.car_brand }} - {{ car.car_model }}</h2>
        <p class="car-price">💰 <strong>${{ car.car_selling_price.toLocaleString() }}</strong></p>
        <p class="car-description">
          {{ car.description || "An amazing car with stunning features, perfect for anyone looking for performance and style." }}
        </p>

        <div class="car-details">
          <p><strong>Color:</strong> {{ car.car_color }}</p>
          <p><strong>Status:</strong> {{ car.car_status }}</p>
          <p><strong>Mileage:</strong> {{ car.car_mileage }}</p>
          <p><strong>Engine:</strong> {{ car.car_engine }}</p>
          <p><strong>Horsepower:</strong> {{ car.car_horsepower }} HP</p>
        </div>
        
        <div class="car-actions">
          <div v-if="car.car_status === 'Available' && loggedIn">
            <button class="buy-button" @click="buyCar">Buy Now</button>
          </div>
          <button class="delete-button" disabled v-else-if="car.car_status === 'Sold'">Car Sold !</button>
          <button class="buy-button" disabled v-else>Buy Now</button>
          <RouterLink :to="`/modify/car/${id}`" v-if="role === 'ADMIN'">
            <button class="info-button">Modify</button>
          </RouterLink>
          <button class="delete-button" @click="deleteCar" v-if="role === 'ADMIN'">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.car-wrapper {
  background-color: #240102;
  padding-top: 50px;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

.car-card {
  flex-direction: column;
  border: 5px solid #8C110F;
  display: flex;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  margin: 0 auto;
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
  gap: 0.8rem;
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

.delete-button {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: #ae3727;
  color: #fff;
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
