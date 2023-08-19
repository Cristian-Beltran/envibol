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
                Usuarios externos (Datos de visitantes)
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
import { getExternalsRequest } from "../../api/external";

import { disconnectCardExternalRequest } from "../../api/card";

export default {
  data() {
    return {
      items: [],
      itemsDisplay: [],
      itemsPerPage: 10,
      searchQuery: "",
      inside: "all",
      color: "light",
      load: true,
      columnas: [
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
      ],
      options: [
        { id: "update", name: "Actualizar", icon: "fas fa-plus" },
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
      ],
    };
  },
  components: {
    Table,
  },
  async created() {
    this.loadData();
  },
  watch: {
    inside() {
      this.searchItems();
    },
  },
  methods: {
    async loadData() {
      this.load = true;
      try {
        const res = await getExternalsRequest();
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
            item.ci.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
          (this.inside === "all" || item.inside.toString() === this.inside)
      );
      this.itemsDisplay = filteredItems;
    },
    async action(action) {
      if (action.action === "update") {
        this.$router.push({
          path: "/admin/updateExternal",
          query: { id: action.id },
        });
      } else if (action.action === "disconnect") {
        try {
          await disconnectCardExternalRequest(action.id);
          this.items = [];
          this.loadData();
        } catch (error) {
          console.log(error);
        }
      } else if (action.action === "connect") {
        try {
          this.$router.push({
            path: "/admin/connectCardExternal",
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
