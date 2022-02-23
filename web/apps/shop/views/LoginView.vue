<template>
  <div class="container py-5">
    <div style="max-width: 320px">
      <h1 class="fw-bold mb-5">Anmelden</h1>
      <form 
        ref="form"
        @submit.prevent="submit" 
        :class="{ 'was-validated': state.wasValidated && !state.errors?.email }" 
        novalidate
      >
        <div class="mb-3">
          <input 
            type="text" 
            class="form-control form-control-lg" 
            placeholder="Benutzer"
            v-model="state.data.username"
            :class="{ 'is-invalid': state.errors?.username }"
            required
          >
          <div class="invalid-feedback" v-if="state.errors?.username">
            {{ state.errors.username.message }}
          </div>
          <div class="invalid-feedback" v-else>
            Sie müssen einen Benutzernamen eingeben
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
        <div class="alert alert-danger" v-if="state.errors">
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
import { FormState } from '@/forms';
import { auth } from '@shop/auth';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'LoginView',

  setup() {
    const form = ref<InstanceType<typeof HTMLFormElement> | null>(null);
    const state: FormState = reactive({
      errors: null,
      wasValidated: false,
      data: {
        username: '',
        password: ''
      }
    });

    const submit = async () => {
      if (!form.value?.checkValidity()) {
        // Show errors
        state.wasValidated = true;
        return;
      }

      try {
        await auth.login(state.data.username, state.data.password);
      } catch(error: any) {
        if(error.response) {
          if(error.response.data.errors) {
            state.errors = error.response.data.errors
          } else {
            state.errors = {
              remoteError: error.response.data
            };
          }
        } else {
          // Client error
          state.errors = {
              error: error.message
          };
        }
      }

      state.data.username = '';
      state.data.password = '';
    }
    
    return {
      form,
      state,
      submit
    }
  },
});
</script>

<style lang="scss">

</style>
