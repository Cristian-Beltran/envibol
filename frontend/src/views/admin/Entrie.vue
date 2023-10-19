<template>
  <card-data title="Entradas" icon="fa-sign-in-alt">
    <template v-slot:filters>
      <div class="pb-4 flex flex-wrap gap-2">
        <Search v-model="searchQuery" />
        <div class="relative mt-1">
          <label class="text-xs text-gray-600 absolute top-0 left-2 transform translate-y-[-110%]">
            Fecha de inicio
          </label>
          <input v-model="init" type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="items" id="items" />
        </div>
        <div class="relative mt-1">
          <label class="text-xs text-gray-600 absolute top-0 left-2 transform translate-y-[-110%]">
            Fecha final
          </label>
          <input v-model="final" type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="items" id="items" />
        </div>
      </div>
      <button-download :data="itemsDisplay" title="Entradas" :columns="columnas" />
    </template>
    <data-table 
      :items="itemsDisplay" 
      :columns="columnas" 
      :options="options" 
      @action="action">
    </data-table>
  </card-data>
</template>
<script setup>
import { getEntriesRequest } from "@/api/entrie";

import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import DataTable from "@/components/Tables/DataTable.vue";
import CardData from "@/components/Cards/CardData.vue";
import ButtonDownload from "@/components/button/ButtonDownload.vue";
import Search from "@/components/Inputs/Search.vue";

const router = useRouter();
const items = ref([]);
const itemsDisplay = ref([]);
const searchQuery = ref("");
const init = ref(
  new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10)
);
const final = ref(
  new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10)
);

const load = ref(true);
const columnas = ref([
  { key: "id", label: "ID" },
  { key: "full_name", label: "Nombre completo" },
  { key: "ci", label: "CI" },
  { key: "role", label: "Rol" },
  { key: "turnstile", label: "Molinete" },
  { key: "createdAt", label: "Entrada", date: true },
]);

const options = ref([]);

async function loadData() {
  load.value = true;
  try {
    const res = await getEntriesRequest(init.value, final.value);
    items.value = res.data;
    itemsDisplay.value = items.value;
    load.value = false;
  } catch (error) {
    toast.error("Error al cargar datos");
  }
}

watch(searchQuery, () => {
  searchItems();
});
watch(init, () => {
  loadData();
});
watch(final, () => {
  loadData();
});

function searchItems(event) {
  const filteredItems = items.value.filter(
    (item) =>
      item.full_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.ci.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

onMounted(() => {
  loadData();
});
</script>
