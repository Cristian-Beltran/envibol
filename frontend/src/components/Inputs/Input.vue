<template>
  <div class="relative w-full mb-3">
    <label
      :for="id"
      class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
    >
      {{ labelText }}
    </label>
    <div class="p-1 mb-1" v-for="(error, index) of errors" :key="index">
      <p class="text-sm text-white bg-red-500 p-2 rounded-md">
        {{ error.$message }}
      </p>
    </div>
    <input
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  </div>
</template>


<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  labelText: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  errors: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});
</script>