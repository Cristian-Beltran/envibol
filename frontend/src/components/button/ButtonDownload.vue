<template>
  <button
    @click="download"
    type="button"
    class="flex items-center h-12 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    Descargar
    <v-icon name="fa-download" class="ml-2" />
  </button>
</template>
<script setup>
import { createTableExcel } from "@/utils/index";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "reporte",
  },
});

function download() {
  createTableExcel(props.data, props.columns, props.title);
}
</script>
