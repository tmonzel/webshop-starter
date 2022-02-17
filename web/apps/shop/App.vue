<template>
  <Navbar />
  <main class="bg-white">
    <router-view></router-view>
  </main>
  <Footer />
  <DialogContainer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Navbar, DialogContainer, Footer } from './components';

export default defineComponent({
  name: 'ShopApp',
  components: {
    Navbar,
    DialogContainer,
    Footer
  }
});
</script>

<style>

</style>
