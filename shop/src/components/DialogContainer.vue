<template>

  <!-- Signup Success Dialog -->
  <Dialog ref="signupSuccessDialog" title="Danke für Ihre Anmeldung">
    Willkommen beim Shop
  </Dialog>

</template>

<script lang="ts">
import { UserActions } from '@/features/auth';
import { store } from '@/state';
import { defineComponent, ref } from 'vue';
import Dialog from './Dialog.vue';

export default defineComponent({
  name: 'DialogContainer',
  components: {
    Dialog
  },

  mounted() {
    store.actions$.subscribe(action => {
      switch(action.type) {
        case UserActions.REGISTER_SUCCESS:
          this.signupSuccessDialog?.open();
      }
    });
    
  },

  setup() {
    const signupSuccessDialog = ref<InstanceType<typeof Dialog>>();

    return {
      signupSuccessDialog
    }
  }
});
</script>

<style lang="scss" scoped>

</style>
