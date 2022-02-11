<template>
  <div class="container mt-5">
    <div style="max-width: 320px">
      <h1 class="mb-5">Registrieren</h1>
      <form 
        @submit.prevent="onSubmit" 
        :class="{ 'was-validated': showValidations && !form.errors?.email }" 
        novalidate
      >
        <div class="mb-3">
          <label for="emailControl" class="form-label">E-Mail</label>
          <input 
            id="emailControl"
            type="email" 
            class="form-control form-control-lg" 
            placeholder="E-Mail"
            v-model="form.data.email"
            :class="{ 'is-invalid': form.errors?.email }"
            required
          >
          <div class="invalid-feedback" v-if="form.errors?.email">
            {{ form.errors.email.message }}
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
            v-model="form.data.username"
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
            v-model="form.data.password"
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
            v-model="form.data.passwordConfirm"
            v-validate="form.data.passwordConfirm !== form.data.password"
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
import { useSignupForm } from '@shop/features/auth';
import { defineComponent } from 'vue';
import { validate } from '@/directives';

export default defineComponent({
  name: 'SignupView',
  directives: {
    validate
  },

  data() {
    return {
      showValidations: false
    }
  },

  methods: {
    onSubmit(e: Event) {
      const form = e.target as HTMLFormElement;

      if (!form.checkValidity()) {
        // Show errors
        this.showValidations = true;
        return;
      }

      this.submit(this.form.data);
    }
  },

  setup() {
    const { form, submit } = useSignupForm();

    return {
      form,
      submit,
    }
  },
});
</script>

<style lang="scss">

</style>
