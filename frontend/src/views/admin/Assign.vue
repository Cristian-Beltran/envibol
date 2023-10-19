<template>
  <card-data title="Empleados" icon="fa-user-tie">
    <template v-slot:filters>
      <div class="pb-4 flex flex-wrap gap-2">
        <Search v-model="searchQuery" />
        <div class="mt-1">
          <select v-model="status"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="all" selected>Estado</option>
            <option value="1">Habilitado</option>
            <option value="2">Deshablitado</option>
          </select>
        </div>
        <div class="mt-1">
          <select v-model="role"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="all" selected>Rol</option>
            <option v-for="role in roles" :key="role.id" :value="role.name">
              {{ role.name }}
            </option>
          </select>
        </div>
      </div>
      <button-add to="/newEmployee"> Agregar empleado </button-add>
    </template>
    <data-table 
      check="true" 
      :items="itemsDisplay" 
      :columns="columnas" 
      :options="options" 
      @action="action"
      @click="handleRowClick">
    </data-table>
  </card-data>
</template>
<script setup>
import {
  getEmployeesStaffRequest,
  getEmployeesAdminRequest,
  deleteEmployeeRequest,
  changeStatusEmployeeRequest,
} from "@/api/employee";
import { getRolesRequest } from "@/api/role";
import { disconnectCardEmployeeRequest } from "@/api/card";

import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { useProfileStore } from "@/stores/profile";

import DataTable from "@/components/Tables/DataTable.vue";
import CardData from "@/components/Cards/CardData.vue";
import ButtonAdd from "@/components/button/ButtonAdd.vue";
import Search from "@/components/Inputs/Search.vue";

const profileStore = useProfileStore();
const router = useRouter();
const items = ref([]);
const roles = ref([]);
const itemsDisplay = ref([]);
const searchQuery = ref("");
const inside = ref("all");
const role = ref("all");
const status = ref("all");
const load = ref(true);
const columnas = ref([
  { key: "id", label: "ID" },
  { key: "first_name", label: "Nombre/s" },
  { key: "last_name", label: "Apellidos" },
  { key: "ci", label: "CI" },
  { key: "role", label: "Rol" },
  { key: "status", label: "Habilitado", status: true },
]);

const options = ref([]);

// array de IDs de empleados
const arrayIds = ref([]);

async function loadData() {
  load.value = true;
  try {
    let res;
    if (profileStore.isAdmin) res = await getEmployeesAdminRequest();
    else res = await getEmployeesStaffRequest();
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
watch(role, () => {
  searchItems();
});
watch(status, () => {
  searchItems();
});

// agregar IDs de empleados seleccionados al array
async function handleRowClick() {
  let id = 0;
  for (let i = 0; i < items.value.length; i++) {
    id = items.value[i].id;
    if (items.value[i].check) {
      if (!arrayIds.value.includes(id))
        arrayIds.value.push(id);
    } else if (arrayIds.value.includes(id)) {
      const indexId = arrayIds.value.indexOf(id);
      arrayIds.value.splice(indexId, 1);
    }
  }
  console.table(arrayIds.value);
}

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
      (inside.value === "all" || item.inside.toString() === inside.value) &&
      (role.value === "all" || item.role === role.value) &&
      (status.value === "all" || item.status === status.value)
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "update") {
    router.push({
      path: "/updateEmployee",
      query: { id: action.id },
    });
  } else if (action.action === "changeStatus") {
    try {
      await changeStatusEmployeeRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Estado de empleado cambiado");
    } catch (error) {
      toast.error("Error al cambiar estado de empleado");
    }
  } else if (action.action === "delete") {
    try {
      await deleteEmployeeRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Empleado eliminado");
    } catch (error) {
      toast.error("Error al eliminar empleado");
    }
  } else if (action.action === "disconnect") {
    try {
      await disconnectCardEmployeeRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Tarjeta desvinculada");
    } catch (error) {
      toast.error("Error al desvincular tarjeta");
    }
  } else if (action.action === "connect") {
    try {
      router.push({
        path: "/connectCardEmployee",
        query: { id: action.id },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

onMounted(async () => {
  loadData();
  try {
    const res = await getRolesRequest();
    roles.value = res.data;
  } catch (error) {
    toast.error("Error al cargar roles");
  }
});
</script>
