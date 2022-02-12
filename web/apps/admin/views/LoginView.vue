<template>
  <div class="container d-flex justify-content-center mt-5">
    <form ref="form" :class="{ 'was-validated': state.wasValidated }" style="width: 280px;" novalidate>
      <h1 class="mb-4">Shop Admin</h1>
      
      <div class="mb-3">
        <FormControl 
          placeholder="Benutzer" 
          size="lg"
          :validate="['required']"
          :errors="{ required: 'Bitte geben sie Ihren Benutzernamen ein.' }"
          v-model="state.data.username" 
        />
      </div>
      <div class="mb-3">
        <FormControl 
          placeholder="Passwort" 
          type="password" 
          size="lg"
          :validate="['required']"
          :errors="{ required: 'Bitte geben sie ein Passwort ein.' }"
          v-model="state.data.password" 
        />
      </div>

      <button type="button" class="btn btn-lg btn-primary" @click="submit">Anmelden</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FormControl } from '@/forms/components';
import { useLoginForm } from '@/auth';

export default defineComponent({
  name: 'LoginView',
  components: {
    FormControl
  },

  setup() {
    return {
      ...useLoginForm()
    }
  }
});
</script>

<style lang="scss">

</style>