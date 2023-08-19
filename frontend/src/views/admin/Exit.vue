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
                Salidas de empleados
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

        <div class="w-full px-12 flex flex-wrap gap-2 justify-between">
          <div class="relative flex flex-wrap items-stretch mb-3">
            <label
              class="py-2 text-sm font-normal text-blueGray-600 mr-2"
              for="items"
              >Fecha de inicio</label
            >
            <input
              v-model="init"
              type="date"
              class="placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-auto"
              name="items"
              id="items"
            />
          </div>

          <div class="relative flex flex-wrap items-stretch mb-3">
            <label
              class="py-2 text-sm font-normal text-blueGray-600 mr-2"
              for="items"
              >Fecha final</label
            >
            <input
              v-model="final"
              type="date"
              class="placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-auto"
              name="items"
              id="items"
            />
          </div>
        </div>

        <hr class="my-4 md:min-w-full border-black" />
        <Table
          :items="itemsDisplay"
          :load="load"
          :columns="columnas"
          :itemsPerPage="itemsPerPage"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Table from "@/components/Tables/Table.vue";
import { getRolesRequest } from "../../api/role";
import { getExitsRequest } from "../../api/entrie";

export default {
  data() {
    return {
      items: [],
      itemsDisplay: [],
      itemsPerPage: 10,
      searchQuery: "",
      init: new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 10),
      final: new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 10),
      role: "all",
      roles: [],
      color: "light",
      load: true,
      columnas: [
        { key: "id", label: "ID" },
        { key: "full_name", label: "Nombre completo" },
        { key: "ci", label: "CI" },
        { key: "role", label: "Rol" },
        { key: "turnstile", label: "Molinete" },
        { key: "createdAt", label: "Salida", date: true },
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
    role() {
      this.searchItems();
    },
    init() {
      this.loadData();
    },
    final() {
      this.loadData();
    },
  },
  methods: {
    async loadData() {
      this.load = true;
      try {
        const res = await getExitsRequest(this.init, this.final);
        console.log(res.data);
        this.items = res.data;
        this.itemsDisplay = this.items;
        this.load = false;
        this.searchItems();
      } catch (error) {
        console.log(error);
      }
    },
    searchItems(event) {
      if (event) event.preventDefault();
      const filteredItems = this.items.filter(
        (item) =>
          (item.full_name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
            item.ci.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
          (this.role === "all" || item.role == this.role)
      );
      this.itemsDisplay = filteredItems;
    },
  },
};
</script>
