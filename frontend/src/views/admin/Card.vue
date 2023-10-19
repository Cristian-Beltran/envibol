<template>
  <card-data title="Tarjetas" icon="fa-address-card">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>
      <button-add to="/newCard">Agregar Tarjeta</button-add>
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
import {
  deleteCardRequest,
  getCardsRequest,
  disconnectCardRequest,
} from "../../api/card";

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
  { key: "type", label: "Tipo de tarjeta" },
  { key: "color", label: "Color", color: true },
  { key: "rfid", label: "Codigo RFID" },
  { key: "description", label: "Descripción" },
  { key: "userName", label: "Usuario" },
  { key: "connect", label: "Vinculada", check: true },
  { key: "createdAt", label: "Creado", date: true },
]);

const options = ref([
  { id: "update", name: "Actualizar", icon: "fa-plus" },
  { id: "delete", name: "Eliminar", icon: "fa-times" },
  {
    id: "disconnect",
    name: "Desvincular tarjeta",
    icon: "fa-eraser",
  },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getCardsRequest();
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
      item.type.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "update") {
    router.push({
      path: "/updateCard",
      query: { id: action.id },
    });
  } else if (action.action === "delete") {
    try {
      await deleteCardRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Tarjeta eliminada");
    } catch (error) {
      toast.error("Error al eliminar tarjeta");
    }
  } else if (action.action === "disconnect") {
    try {
      await disconnectCardRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Tarjeta desvinculada");
    } catch (error) {
      toast.error("Error al desvincular tarjeta");
    }
  }
}

onMounted(() => {
  loadData();
});
</script>
