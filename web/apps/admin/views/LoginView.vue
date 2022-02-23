<template>
  <div class="container d-flex justify-content-center mt-5">
    <form 
      ref="form" 
      @submit.prevent="submit" 
      :class="{ 'was-validated': state.wasValidated }" 
      style="width: 280px;" 
      novalidate
    >
      <!--<h5><span class="badge bg-dark">Verwaltung</span></h5>-->
      <h1 class="display-2 mb-4 fw-bold" style="line-height: 1;">
        Das<br>Lager
      </h1>
      
      <hr class="my-5">

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

    const submit = async () => {
      if (!form.value?.checkValidity()) {
        // Show errors
        state.wasValidated = true;
        return;
      }

      try {
        auth.login(state.data.username, state.data.password);
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
  }
});
</script>

<style lang="scss">

</style>