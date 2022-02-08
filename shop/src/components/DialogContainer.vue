<template>

  <!-- Signup Success Dialog -->
  <Dialog ref="signupSuccessDialog" title="Danke für Ihre Anmeldung">
    Willkommen beim Shop
  </Dialog>

  <!-- Order Success Dialog -->
  <Dialog ref="orderSuccessDialog" title="Danke für Ihre Bestellung">
    Sie werden per E-Mail über diverse Dinge informiert.
  </Dialog>

</template>

<script lang="ts">
import { UserActions } from '@/features/auth';
import { CartActions } from '@/features/cart';
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
          break;
        case CartActions.ORDER_SUCCESS:
          this.orderSuccessDialog?.open();
      }
    });
    
  },

  setup() {
    const signupSuccessDialog = ref<InstanceType<typeof Dialog>>();
    const orderSuccessDialog = ref<InstanceType<typeof Dialog>>();

    return {
      signupSuccessDialog,
      orderSuccessDialog
    }
  }
});
</script>

<style lang="scss" scoped>

</style>
