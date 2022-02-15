<template>
  <div class="p-1 bg-light d-flex justify-content-end">
    <button class="btn" @click="auth.logout">Logout</button>
  </div>

  <div class="d-flex">
    <div class="col py-5 px-4" style="max-width: 250px;">
      <ul class="nav nav-pills flex-column">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Übersicht</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Produkte</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/orders">Bestellungen</router-link>
        </li>
      </ul>

    </div>
    <div class="col p-5">
      <router-view></router-view>
    </div>
  </div>
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
