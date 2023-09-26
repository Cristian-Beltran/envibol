<template>
  <card-data title="Tipos de Tarjetas" icon="fa-address-card">
    <template v-slot:filters>
      <div class="pb-4">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <v-icon
              name="fa-search"
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
            />
          </div>
          <input
            type="text"
            v-model="searchQuery"
            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar"
          />
        </div>
      </div>
      <button-add to="/newTypeCard">Agregar Tipo de Tarjeta</button-add>
    </template>
    <data-table
      :items="itemsDisplay"
      :columns="columnas"
      :options="options"
      @action="action"
    ></data-table>
  </card-data>
</template>
<script setup>
import { deleteTypeCardRequest, getTypeCardsRequest } from "../../api/typecard";
import { ref, onMounted, watch } from "vue";
import DataTable from "@/components/Tables/DataTable.vue";
import ButtonAdd from "@/components/button/ButtonAdd.vue";
import CardData from "@/components/Cards/CardData.vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

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
