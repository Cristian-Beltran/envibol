<template>
  <card-data title="Externos" icon="fa-user">
    <template v-slot:filters>
      <div class="pb-4 flex flex-wrap gap-2">
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
            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar"
          />
        </div>
        <div class="mt-1">
          <select
            v-model="inside"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="all" selected>Presente/Ausente</option>
            <option value="true">Presentes</option>
            <option value="false">Ausentes</option>
          </select>
        </div>
      </div>
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
import { getExternalsRequest } from "@/api/external";
import { disconnectCardExternalRequest } from "@/api/card";

import { ref, onMounted, watch } from "vue";
import DataTable from "@/components/Tables/DataTable.vue";
import CardData from "@/components/Cards/CardData.vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const router = useRouter();
const items = ref([]);
const itemsDisplay = ref([]);
const searchQuery = ref("");
const inside = ref("all");
const load = ref(true);
const columnas = ref([
  { key: "id", label: "ID" },
  { key: "first_name", label: "Nombre/s" },
  { key: "last_name", label: "Apellidos" },
  { key: "ci", label: "CI" },
  { key: "cel", label: "Celular" },
  { key: "telf", label: "telf" },
  { key: "address", label: "Direccion" },
  { key: "inside", label: "Presente", check: true },
  { key: "card", label: "Tarjeta", color: true },
  { key: "createdAt", label: "Creado", date: true },
]);

const options = ref([
  { id: "update", name: "Actualizar", icon: "fa-plus" },
  {
    id: "connect",
    name: "Vincular tarjeta",
    icon: "fa-link",
  },
  {
    id: "disconnect",
    name: "Desvincular tarjeta",
    icon: "fa-eraser",
  },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getExternalsRequest();
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
watch(inside, () => {
  searchItems();
});

function searchItems(event) {
  const filteredItems = items.value.filter(
    (item) =>
      (item.first_name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
        item.last_name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        item.ci.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (inside.value === "all" || item.inside.toString() === inside.value)
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "update") {
    router.push({
      path: "/updateExternal",
      query: { id: action.id },
    });
  } else if (action.action === "disconnect") {
    try {
      await disconnectCardExternalRequest(action.id);
      items.value = [];
      loadData();
    } catch (error) {
      toast.error("Error al desvincular tarjeta");
    }
  } else if (action.action === "connect") {
    router.push({
      path: "/connectCardExternal",
      query: { id: action.id },
    });
  }
}

onMounted(() => {
  loadData();
});
</script>
