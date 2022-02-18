<template>
  <div>
    <h1>Benutzer</h1>
    <table class="table">
      <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Benutzername</th>
            <th scope="col">Rollen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in state.items" :key="user._id">
            <th scope="row">{{ user._id }}</th>
            <td>{{ user.username }}</td>
            <td>{{ user.roles }}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useUsers } from '@/composables/user';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UsersView',

  setup() {
    const { state, loadAllIfNecessary } = useUsers();

    loadAllIfNecessary();

    return {
      state
    }
  }
});
</script>

<style lang="scss">

</style>
