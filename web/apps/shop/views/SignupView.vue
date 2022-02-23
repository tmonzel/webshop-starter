<template>
  <div class="container py-5">
    <div style="max-width: 640px;">
      <h1>Support the Laden!</h1>
      <p class="lead mb-5">Werden Sie ein Teil der nicht endenden Erfolgsgeschichte und<br>schöpfen sie aus dem reichhaltigen Angebot an Krims und Krams.<br></p>
      <form 
        ref="form"
        @submit.prevent="submit" 
        :class="{ 'was-validated': state.wasValidated && !state.errors?.email }" 
        novalidate
      >
        <div class="rounded mb-3">
          <div class="row">
            <div class="col-12 mb-3">
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
          </div>

          <div class="row">
            <div class="col">
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
            </div>

            <div class="col">
              <div class="mb-3">
                <label for="passwordConfirmControl" class="form-label">&nbsp;</label>
                <input 
                  id="passwordConfirmControl"
                  type="password" 
                  class="form-control form-control-lg" 
                  placeholder="Passwort bestätigen"
                  v-model="passwordConfirm"
                  v-validate="passwordConfirm !== state.data.password"
                  required
                >
                <div class="invalid-feedback">
                  Sie müssen das Passwort korrekt bestätigen.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded mb-3">
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="emailControl" class="form-label">E-Mail</label>
                <input 
                  id="emailControl"
                  type="email" 
                  class="form-control form-control-lg" 
                  placeholder="E-Mail"
                  v-model="state.data.email"
                  required
                >
                <div class="invalid-feedback">
                  Sie müssen eine korrekte E-Mail eingeben
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="firstNameControl" class="form-label">Vorname</label>
                <input 
                  id="firstNameControl"
                  type="text" 
                  class="form-control form-control-lg" 
                  placeholder="Vorname"
                  v-model="state.data.firstName"
                  required
                >
                <div class="invalid-feedback">
                  Sie müssen einen Vornamen eingeben
                </div>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="lastNameControl" class="form-label">Nachname</label>
                <input 
                  id="lastNameControl"
                  type="text" 
                  class="form-control form-control-lg" 
                  placeholder="Nachname"
                  v-model="state.data.lastName"
                  required
                >
                <div class="invalid-feedback">
                  Sie müssen einen Nachnamen eingeben
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="addressControl" class="form-label">Adresse</label>
                <input 
                  id="addressControl"
                  type="text" 
                  class="form-control form-control-lg" 
                  placeholder="Adresse"
                  v-model="state.data.address"
                  required
                >
                <div class="invalid-feedback">
                  Sie müssen eine Adresse eingeben
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-lg btn-primary">Abschicken</button>
      </form>
    </div>
  </div>

  
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { validate } from '@/directives';
import { FormState } from '@/forms';
import { api } from '@/core';
import { store } from '@/state';
import { CustomerResource } from '@/resources';

export default defineComponent({
  name: 'SignupView',
  directives: {
    validate
  },

  setup() {
    const form = ref<InstanceType<typeof HTMLFormElement> | null>(null);
    const passwordConfirm = ref('');
    const state: FormState = reactive({
      errors: null,
      wasValidated: false,
      data: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        email: ''
      },
    });

    const submit = async () => {
      if (!form.value?.checkValidity()) {
        // Show errors
        state.wasValidated = true;
        return;
      }

      try {
        await CustomerResource.create(state.data);
      } catch(error: any) {
        state.errors = error.response.data.errors;
      }

      // Success
      store.dispatch({ type: 'REGISTER_SUCCESS' });

      // Reset form
      state.errors = null;
      state.data.username = '';
      state.data.password = '';
      state.data.firstName = '';
      state.data.lastName = '';
      state.data.address = '';
      state.data.email = '';
      
      passwordConfirm.value = '';
    }

    return {
        form,
        state, 
        submit,
        passwordConfirm
    }
  },
});
</script>

<style lang="scss">

</style>
