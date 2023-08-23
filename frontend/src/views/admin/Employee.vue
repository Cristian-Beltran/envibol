<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
        :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                class="font-semibold text-lg"
                :class="[
                  color === 'light' ? 'text-blueGray-700' : 'text-white',
                ]"
              >
                Empleados
              </h3>
            </div>
          </div>
        </div>
        <hr class="my-4 md:min-w-full border-black" />
        <div class="w-full px-12 flex flex-wrap gap-2 justify-between">
          <div class="relative flex flex-wrap items-stretch mb-3">
            <label
              class="py-2 text-sm font-normal text-blueGray-600 mr-2"
              for="items"
              >Numero de items</label
            >
            <select
              v-model="itemsPerPage"
              class="placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-auto"
              name="items"
              id="items"
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <form
            class="relative flex flex-wrap items-stretch mb-3"
            :onSubmit="searchItems"
          >
            <span
              class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-2"
            >
              <i class="fas fa-search"></i>
            </span>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar"
              class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"
            />
          </form>
          <div class="relative flex flex-wrap items-stretch mb-3">
            <router-link to="/admin/newEmployee" v-slot="{ href, navigate }">
              <a :href="href" @click="navigate">
                <button
                  class="bg-grayBlue-800 text-sm border border-gray-300 px-2 py-2 rounded-md"
                >
                  Agregar Empleado
                  <i class="fas fa-plus text-sm ml-2"></i>
                </button>
              </a>
            </router-link>
          </div>
        </div>

        <div class="w-full px-12 flex flex-wrap gap-2 justify-between">
          <div class="relative flex flex-wrap items-stretch mb-3">
            <label
              class="py-2 text-sm font-normal text-blueGray-600 mr-2"
              for="items"
              >Presente</label
            >
            <select
              v-model="inside"
              class="placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-auto"
              name="items"
              id="items"
            >
              <option value="all" selected>Todos</option>
              <option value="true">Presentes</option>
              <option value="false">Ausentes</option>
            </select>
          </div>

          <div class="relative flex flex-wrap items-stretch mb-3">
            <label
              class="py-2 text-sm font-normal text-blueGray-600 mr-2"
              for="items"
              >Habilitados</label
            >
            <select
              v-model="status"
              class="placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-auto"
              name="items"
              id="items"
            >
              <option value="all" selected>Todos</option>
              <option value="1">Habilitados</option>
              <option value="2">Deshabilitados</option>
            </select>
          </div>
          <div class="relative flex flex-wrap items-stretch mb-3">
            <label
              class="py-2 text-sm font-normal text-blueGray-600 mr-2"
              for="items"
              >Rol</label
            >
            <select
              v-model="role"
              class="placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-auto"
              name="items"
              id="items"
            >
              <option value="all" selected>Todos</option>
              <option v-for="item in roles" :value="item.name" :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>

        <hr class="my-4 md:min-w-full border-black" />
        <Table
          :items="itemsDisplay"
          :load="load"
          :columns="columnas"
          :options="options"
          :itemsPerPage="itemsPerPage"
          @action="action"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Table from "@/components/Tables/Table.vue";
import {
  getEmployeesStaffRequest,
  getEmployeesAdminRequest,
  deleteEmployeeRequest,
  changeStatusEmployeeRequest,
} from "../../api/employee";
import { getRolesRequest } from "../../api/role";

import { disconnectCardEmployeeRequest } from "../../api/card";

export default {
  data() {
    return {
      items: [],
      itemsDisplay: [],
      itemsPerPage: 10,
      searchQuery: "",
      inside: "all",
      status: "all",
      role: "all",
      roles: [],
      color: "light",
      load: true,
      columnas: [
        { key: "id", label: "ID" },
        { key: "first_name", label: "Nombre/s" },
        { key: "last_name", label: "Apellidos" },
        { key: "email", label: "Correo electronico" },
        { key: "ci", label: "CI" },
        { key: "cel", label: "Celular" },
        { key: "telf", label: "telf" },
        { key: "address", label: "Direccion" },
        { key: "role", label: "Rol" },
        { key: "inside", label: "Presente", check: true },
        { key: "status", label: "Habilitado", status: true },
        { key: "card", label: "Tarjeta", color: true },
        { key: "createdAt", label: "Creado", date: true },
      ],
      options: [
        { id: "update", name: "Actualizar", icon: "fas fa-plus" },
        {
          id: "changeStatus",
          name: "Cambiar estado de usuario",
          icon: "fas fa-exchange-alt",
        },
        {
          id: "connect",
          name: "Vincular tarjeta",
          icon: "fas fa-link",
        },
        {
          id: "disconnect",
          name: "Desvincular tarjeta",
          icon: "fas fa-eraser",
        },
        { id: "delete", name: "Eliminar", icon: "fas fa-times" },
      ],
    };
  },
  components: {
    Table,
  },
  async created() {
    this.loadData();
    try {
      const res = await getRolesRequest();
      this.roles = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    inside() {
      this.searchItems();
    },
    role() {
      this.searchItems();
    },
    status() {
      this.searchItems();
    },
  },
  methods: {
    async loadData() {
      this.load = true;
      try {
        const isAdmin = this.$store.getters.isAdmin;
        let res;
        if (isAdmin) res = await getEmployeesAdminRequest();
        else res = await getEmployeesStaffRequest();
        this.items = res.data;
        this.itemsDisplay = this.items;
        this.load = false;
      } catch (error) {
        console.log(error);
      }
    },
    searchItems(event) {
      if (event) event.preventDefault();
      const filteredItems = this.items.filter(
        (item) =>
          (item.first_name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
            item.last_name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            item.ci.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.email
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) &&
          (this.inside === "all" || item.inside.toString() === this.inside) &&
          (this.status === "all" || item.status == this.status) &&
          (this.role === "all" || item.role == this.role)
      );
      this.itemsDisplay = filteredItems;
    },
    async action(action) {
      if (action.action === "update") {
        this.$router.push({
          path: "/admin/updateEmployee",
          query: { id: action.id },
        });
      } else if (action.action === "changeStatus") {
        try {
          await changeStatusEmployeeRequest(action.id);
          this.items = [];
          this.loadData();
        } catch (error) {
          console.log(error);
        }
      } else if (action.action === "delete") {
        try {
          await deleteEmployeeRequest(action.id);
          this.items = [];
          this.loadData();
        } catch (error) {
          console.log(error);
        }
      } else if (action.action === "disconnect") {
        try {
          await disconnectCardEmployeeRequest(action.id);
          this.items = [];
          this.loadData();
        } catch (error) {
          console.log(error);
        }
      } else if (action.action === "connect") {
        try {
          this.$router.push({
            path: "/admin/connectCardEmployee",
            query: { id: action.id },
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
