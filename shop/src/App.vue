<template>
  <Navbar />
  <main>
    <router-view></router-view>
  </main>
  <DialogContainer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Navbar, DialogContainer } from './components';

export default defineComponent({
  name: 'ShopApp',
  components: {
    Navbar,
    DialogContainer
  }
});
</script>

<style>

</style>
