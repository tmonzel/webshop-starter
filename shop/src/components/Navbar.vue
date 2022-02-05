<template>
  <nav class="navbar navbar-expand-lg bg-light shadow-lg">
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

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products">Produkte</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/cart">Warenkorb <span class="badge bg-primary">2</span></RouterLink>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navbar',

  setup() {
  }
});
</script>

<style scoped>

</style>
