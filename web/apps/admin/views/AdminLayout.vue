<template>
  <nav class="navbar bg-light justify-content-end">
    <button class="btn" @click="auth.logout">Logout</button>
  </nav>

  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { auth } from '../auth';

export default defineComponent({
  name: 'AdminLayout',

  setup() {
    return {
      auth
    }
  }
});
</script>

<style lang="scss">

</style>
