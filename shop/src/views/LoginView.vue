<template>
  <div class="container mt-5">
    <h1 class="mb-5">Anmelden</h1>
    <form 
      @submit.prevent="onSubmit" 
      :class="{ 'was-validated': showValidations && !form.errors.email }" 
      style="max-width: 320px" 
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
      <button type="submit" class="btn btn-lg btn-primary">Anmelden</button>
    </form>
  </div>

  
</template>

<script lang="ts">
import { useLoginForm } from '@/features/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginView',

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

      const formData = this.form.data;

      this.submit(
        formData.email, 
        formData.password
      );
    }
  },

  setup() {
    const { form, submit } = useLoginForm();

    return {
      form,
      submit,
    }
  },
});
</script>

<style lang="scss">

</style>
