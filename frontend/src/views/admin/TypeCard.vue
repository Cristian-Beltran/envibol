<template>
  <card-data title="Tipos de Tarjetas" icon="fa-address-card">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>
      <button-add to="/newTypeCard">Agregar Tipo de Tarjeta</button-add>
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
import { deleteTypeCardRequest, getTypeCardsRequest } from "@/api/typecard";

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
  { key: "name", label: "Nombre" },
  { key: "color", label: "Color", color: true },
  { key: "description", label: "Descripción" },
  { key: "createdAt", label: "Creado", date: true },
]);

const options = ref([
  { id: "update", name: "Actualizar", icon: "fa-plus" },
  { id: "delete", name: "Eliminar", icon: "fa-times" },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getTypeCardsRequest();
    items.value = res.data;
    itemsDisplay.value = items.value;
    load.value = false;
  } catch (error) {
    toast.error("Error al cargar datos");
    console.log(error);
  }
}

watch(searchQuery, () => {
  searchItems();
});

function searchItems(event) {
  const filteredItems = items.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "update") {
    router.push({
      path: "/updateTypeCard",
      query: { id: action.id },
    });
  } else if (action.action === "delete") {
    try {
      await deleteTypeCardRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Tarjeta eliminada");
    } catch (error) {
      toast.error("Error al eliminar tarjeta");
    }
  }
}

onMounted(() => {
  loadData();
});
</script>
