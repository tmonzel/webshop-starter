<template>
  <teleport to="body">
    <div ref="dialog" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>
          <div class="modal-body">
            <slot :close="close"></slot>
          </div>
          <div class="modal-footer" v-if="hasFooterSlot()">
            <slot name="footer" :close="close"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Modal } from 'bootstrap';

export default defineComponent({
  name: 'Dialog',
  props: {
    title: {
        type: String,
        required: false
    },

    size: {
        type: String,
        required: false
    },
  },

  methods: {
    open() {
      this.dialog.show();
    },
    
    close() {
      this.dialog.hide();
    },

    hasFooterSlot() {
      return !!this.$slots.footer
    }
  },

  data() {
    return {
      dialog: {} as Modal
    }
  },

  mounted() {
    this.dialog = new Modal(
      this.$refs.dialog as HTMLDivElement
    );
  }
});
</script>

<style lang="scss" scoped>

</style>
