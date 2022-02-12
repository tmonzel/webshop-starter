<template>
    <label v-if="label" :for="uid" class="form-label">{{ label }}</label>
    <input 
        ref="control"
        :type="type" 
        :id="uid" 
        :placeholder="placeholder ?? label"
        class="form-control"
        :class="{ 'form-control-lg': size === 'lg' }"
        v-model="value"
        :required="required"
        @input="updateValidity"
    >
    <div class="invalid-feedback">
        <span v-if="state.errors.required">{{ errors.required ?? 'Diese Feld ist erforderlich.' }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  name: 'FormControl',
  props: {
    label: {
        type: String,
        default: null
    },

    type: {
        type: String,
        default: 'text'
    },

    validate: {
        type: Array,
        default: () => {
            return []
        }
    },

    errors: {
        type: Object,
        default: () => {
            return {}
        }
    },

    size: String,
    placeholder: String,
    modelValue: String
  },

  emits: ['update:modelValue'],

  computed: {
    value: {
      get() {
        return this.modelValue
      },

      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },

  mounted() {
      this.updateValidity();
  },

  setup(props) {
    const uid = uuidv4();
    const required = props.validate.includes('required');
    const control = ref<InstanceType<typeof HTMLInputElement> | null>(null);
    const state = reactive({
        errors: {
            required: false
        }
    });

    const updateValidity = () => {
        const validity = control.value?.validity;
        
        if(validity?.valueMissing) {
            state.errors.required = true;
        } else {
            state.errors.required = false;
        }
    }

    return {
        uid,
        state,
        required,
        control,
        updateValidity
    }
  }
});
</script>