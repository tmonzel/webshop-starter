<template>
  <div class="container mt-5">
    <div style="max-width: 320px">
      <h1 class="mb-5">Anmelden</h1>
      <form 
        ref="form"
        @submit.prevent="submit" 
        :class="{ 'was-validated': state.wasValidated && !state.errors?.email }" 
        novalidate
      >
        <div class="mb-3">
          <input 
            type="email" 
            class="form-control form-control-lg" 
            placeholder="E-Mail"
            v-model="state.data.email"
            :class="{ 'is-invalid': state.errors?.email }"
            required
          >
          <div class="invalid-feedback" v-if="state.errors?.email">
            {{ state.errors.email.message }}
          </div>
          <div class="invalid-feedback" v-else>
            Sie müssen eine korrekte E-Mail eingeben
          </div>
        </div>
        <div class="mb-3">
          <input 
            type="password" 
            class="form-control form-control-lg" 
            placeholder="Password"
            v-model="state.data.password"
            required
          >
          <div class="invalid-feedback">
            Sie müssen ein Passwort eingeben
          </div>
        </div>
        <div class="alert alert-danger" v-if="hasErrors">
          Anmeldung fehlgeschlagen.<br>
          Überprüfen Sie Ihre Zugangsdaten
        </div>
        <div class="mb-3">
          <small>Noch kein Kunde? Registrieren Sie sich jetzt <router-link to="/signup">hier</router-link>.</small>
        </div>
        <button type="submit" class="btn btn-lg btn-primary">Anmelden</button>
      </form>
    </div>
  </div>

  
</template>

<script lang="ts">
import { useLoginForm } from '@/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginView',

  setup() {
    return {
      ...useLoginForm()
    }
  },
});
</script>

<style lang="scss">

</style>
