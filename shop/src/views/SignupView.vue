<template>
  <div class="container mt-5 d-flex justify-content-center">
    <div>
      <h1 class="mb-5">Registrieren</h1>
      <form 
        @submit.prevent="onSubmit" 
        :class="{ 'was-validated': showValidations && !form.errors.email }" 
        novalidate
      >
        <div class="mb-3">
          <input 
            type="email" 
            class="form-control form-control-lg" 
            placeholder="E-Mail"
            v-model="form.data.email"
            :class="{ 'is-invalid': form.errors.email }"
            required
          >
          <div class="invalid-feedback" v-if="form.errors.email">
            {{ form.errors.email.message }}
          </div>
          <div class="invalid-feedback" v-else>
            Sie müssen eine korrekte E-Mail eingeben
          </div>
        </div>
        <div class="mb-3">
          <input 
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
          <input 
            type="password" 
            class="form-control form-control-lg" 
            placeholder="Password"
            v-model="form.data.password"
            required
          >
          <div class="invalid-feedback">
            Sie müssen ein Passwort eingeben
          </div>
        </div>
        <button type="submit" class="btn btn-lg btn-primary">Abschicken</button>
      </form>
    </div>
  </div>

  
</template>

<script lang="ts">
import { useSignupForm } from '@/features/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignupView',

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
