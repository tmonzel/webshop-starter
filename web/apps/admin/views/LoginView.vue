<template>
  <div class="container d-flex justify-content-center mt-5">
    <form 
      ref="form" 
      @submit.prevent="submit" 
      :class="{ 'was-validated': state.wasValidated }" 
      style="width: 280px;" 
      novalidate
    >
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

      <div class="alert alert-danger" v-if="state.errors">
        Anmeldung fehlgeschlagen.<br>
        Überprüfen Sie Ihre Zugangsdaten
      </div>

      <button type="submit" class="btn btn-lg btn-primary">Anmelden</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { FormControl } from '@/forms/components';
import { FormState } from '@/forms';
import { auth } from '@admin/auth';

export default defineComponent({
  name: 'LoginView',
  components: {
    FormControl
  },

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

    const submit = () => {
      if (!form.value?.checkValidity()) {
        // Show errors
        state.wasValidated = true;
        return;
      }

      auth.login(state.data.username, state.data.password).subscribe({
        next: (user) => {
          // Reset form state
          state.data.username = '';
          state.data.password = '';
        },

        error: (error) => {
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
      });
    }
    
    return {
      form,
      state,
      submit
    }
  }
});
</script>

<style lang="scss">

</style>