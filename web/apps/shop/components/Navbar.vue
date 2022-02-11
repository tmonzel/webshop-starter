<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light shadow-lg">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        <i class="bi-shop" style="font-size: 2rem"></i>
      </RouterLink>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNavDropdown" 
        aria-controls="navbarNavDropdown" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products">Artikel</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/cart">Warenkorb <span class="badge bg-primary">{{ cart.items.length }}</span></RouterLink>
          </li>
        </ul>

        <ul class="navbar-nav" v-if="auth.user">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ auth.user.email }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#">Profil</a></li>
              <li><RouterLink class="dropdown-item" to="/orders">Bestellungen</RouterLink></li>
              <li><a class="dropdown-item" href="#" @click="logout">Abmelden</a></li>
            </ul>
          </li>
        </ul>

        <ul class="navbar-nav" v-else>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login">Anmelden</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/signup">Registrieren</RouterLink>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

<script lang="ts">
import { useAuth } from '@/auth/composables';
import { useCart } from '@shop/features/cart';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navbar',

  setup() {
    const { state: cart } = useCart();
    const { state: auth, logout } = useAuth();

    return {
      cart,
      auth,
      logout
    }
  }
});
</script>

<style scoped>

</style>
