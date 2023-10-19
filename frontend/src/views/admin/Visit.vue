<template>
  <card-data title="Visitas" icon="fa-user-edit">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>
      <button-add to="/newVisit">Agregar visita</button-add>
    </template>
    <data-table 
      :items="itemsDisplay" 
      :columns="columnas" 
      :options="[]" 
      @action="action">
    </data-table>
  </card-data>
</template>
<script setup>
import { getVisitsRequest } from "@/api/visit";

import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import DataTable from "@/components/Tables/DataTable.vue";
import ButtonAdd from "@/components/button/ButtonAdd.vue";
import CardData from "@/components/Cards/CardData.vue";
import Search from "@/components/Inputs/Search.vue";

const router = useRouter();
const items = ref([]);
const itemsDisplay = ref([]);
const searchQuery = ref("");
const load = ref(true);
const columnas = ref([
  { key: "id", label: "ID" },
  { key: "full_name", label: "Nombre de visitante" },
  { key: "ci", label: "CI" },
  { key: "reason", label: "Razon" },
  { key: "createdAt", label: "Creado", date: true },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getVisitsRequest();
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

function searchItems(event) {
  const filteredItems = items.value.filter(
    (item) =>
      item.full_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.ci.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

onMounted(() => {
  loadData();
});
</script>
