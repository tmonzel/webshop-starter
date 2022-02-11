import { Directive, DirectiveBinding, onUpdated } from 'vue';

const toggleValidation = (el, state: boolean) => {
    if(state) {
        el.setCustomValidity('Error');
    } else {
        el.setCustomValidity('');
    }
}

export const validate: Directive = {
    updated(el, binding: DirectiveBinding<boolean>) {
        toggleValidation(el, binding.value);
    },

    mounted(el, binding: DirectiveBinding<boolean>) {
        toggleValidation(el, binding.value);
    },
}
