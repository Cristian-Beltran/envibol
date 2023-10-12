<script setup>
import { VueFinalModal } from "vue-final-modal";
defineProps({
  title: {
    type: String,
    default: "Modal",
  },
});
const emit = defineEmits({
  confirm: () => true,
});
</script>
<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
  >
    <div
      class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
    >
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <button
        type="button"
        @click="modelValue = false"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="defaultModal"
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
    </div>
    <div
      class="p-6 space-y-6 text-base leading-relaxed text-gray-500 dark:text-gray-400"
    >
      <slot />
    </div>
    <div
      class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
    >
      <button
        @click="emit('confirm')"
        data-modal-hide="defaultModal"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Confirmar
      </button>
      <button
        @click="modelValue = false"
        data-modal-hide="defaultModal"
        type="button"
        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
      >
        Cancelar
      </button>
    </div>
  </VueFinalModal>
</template>
