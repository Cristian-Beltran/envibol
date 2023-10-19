<template>
  <card-data title="Roles de empleados" icon="fa-users">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>
      <button-add to="/newRole">Agregar Rol</button-add>
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
import { getRolesRequest } from "@/api/role";

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
  { key: "description", label: "Descripción" },
  { key: "createdAt", label: "Creado", date: true },
]);

const options = ref([{ id: "update", name: "Actualizar", icon: "fa-plus" }]);

async function loadData() {
  load.value = true;
  try {
    const res = await getRolesRequest();
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
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "update") {
    router.push({
      path: "/updateRole",
      query: { id: action.id },
    });
  }
}

onMounted(() => {
  loadData();
});
</script>
