<template>
  <div class="container mt-5">
    <div style="max-width: 320px">
      <h1 class="mb-5">Registrieren</h1>
      <form 
        ref="form"
        @submit.prevent="submit" 
        :class="{ 'was-validated': state.wasValidated && !state.errors?.email }" 
        novalidate
      >
        <div class="mb-3">
          <label for="emailControl" class="form-label">E-Mail</label>
          <input 
            id="emailControl"
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
          <label for="usernameControl" class="form-label">Benutzername</label>
          <input 
            id="usernameControl"
            type="text" 
            class="form-control form-control-lg" 
            placeholder="Benutzername"
            v-model="state.data.username"
            required
          >
          <div class="invalid-feedback">
            Sie müssen einen Benutzernamen eingeben
          </div>
        </div>
        <div class="mb-3">
          <label for="passwordControl" class="form-label">Passwort</label>
          <input 
            id="passwordControl"
            type="password" 
            class="form-control form-control-lg" 
            placeholder="Passwort"
            v-model="state.data.password"
            required
          >
          <div class="invalid-feedback">
            Sie müssen ein Passwort eingeben.
          </div>
        </div>
        <div class="mb-3">
          <input 
            type="password" 
            class="form-control form-control-lg" 
            placeholder="Passwort bestätigen"
            v-model="state.data.passwordConfirm"
            v-validate="state.data.passwordConfirm !== state.data.password"
            required
          >
          <div class="invalid-feedback">
            Sie müssen das Passwort korrekt bestätigen.
          </div>
        </div>
        <button type="submit" class="btn btn-lg btn-primary">Abschicken</button>
      </form>
    </div>
  </div>

  
</template>

<script lang="ts">
import { useSignupForm } from '@/auth';
import { defineComponent } from 'vue';
import { validate } from '@/directives';

export default defineComponent({
  name: 'SignupView',
  directives: {
    validate
  },

  setup() {
    return {
      ...useSignupForm()
    }
  },
});
</script>

<style lang="scss">

</style>
