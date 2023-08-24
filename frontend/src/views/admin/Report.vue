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
                Entradas y salidas de empleados
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
          <div class="relative flex flex-wrap items-stretch mb-3">
            <button
              @click="generateExcel()"
              class="bg-grayBlue-800 text-sm border border-gray-300 px-2 py-2 rounded-md"
            >
              Descargar
              <i class="fas fa-download text-sm ml-2"></i>
            </button>
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
import { getEntriesExitsRequest } from "../../api/entrie";

import ExcelJS from "exceljs";

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
        { key: "type", label: "E/S" },
        { key: "turnstile", label: "Molinete" },
        { key: "createdAt", label: "Ingreso", date: true },
      ],
    };
  },
  components: {
    Table,
  },
  async created() {
    try {
      const res = await getRolesRequest();
      this.roles = res.data;
      this.loadData();
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
        const res = await getEntriesExitsRequest(this.init, this.final);
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
    date(value) {
      var date = new Date(value);
      function agregarCeros(numero) {
        return numero < 10 ? "0" + numero : numero;
      }
      var ano = date.getFullYear();
      var mes = agregarCeros(date.getMonth() + 1);
      var dia = agregarCeros(date.getDate());
      var hora = agregarCeros(date.getHours());
      var minuto = agregarCeros(date.getMinutes());
      var dateFormat = ano + "-" + mes + "-" + dia + " " + hora + ":" + minuto;
      return dateFormat;
    },
    async generateExcel() {
      try {
        // Datos de ejemplo
        const data = this.itemsDisplay;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Reporte");

        // Establecer fuente personalizada
        const customFont = {
          name: "Arial",
          size: 14,
        };

        // Establecer estilos
        const headerStyle = {
          font: { ...customFont, bold: true },
          alignment: { horizontal: "center" },
          fill: {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFFCC00" },
          },
        };

        const dataStyle = {
          alignment: { horizontal: "left" },
        };

        // Agregar título
        const titleRow = worksheet.addRow([
          "Reporte envibol entradas y salidas de personal",
        ]);
        titleRow.font = { ...customFont, size: 18 };
        titleRow.getCell(1).alignment = { horizontal: "center" };
        titleRow.getCell(1).border = {
          top: { style: "thick" },
          bottom: { style: "thick" },
        };
        worksheet.mergeCells(`A1:G2`);

        // Agregar espacio entre título y fechas
        worksheet.addRow([""]);
        worksheet.addRow([""]);

        // Agregar fecha de creación y rango de fechas
        const currentDate = new Date();
        const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
        worksheet.addRow([`Fecha de reporte: ${formattedDate}`]);
        const dateRow = worksheet.getRow(6);
        dateRow.getCell(1).alignment = { horizontal: "left" };
        dateRow.getCell(1).font = customFont;
        worksheet.mergeCells(`A3:C3`);
        worksheet.addRow([
          "Fecha de inicio: " + this.init,
          "",
          "Fecha final: " + this.final,
        ]);
        const filterRow = worksheet.getRow(7);
        filterRow.getCell(1).alignment = { horizontal: "left" };
        worksheet.mergeCells(`A4:B4`);
        worksheet.getCell("A4").font = customFont;

        // Agregar encabezados
        const headerRow = worksheet.addRow([
          "ID",
          "Nombre completo",
          "CI",
          "Rol",
          "E/S",
          "Molino",
          "Ingreso",
        ]);
        headerRow.eachCell((cell) => {
          cell.fill = headerStyle.fill;
          cell.font = headerStyle.font;
          cell.alignment = headerStyle.alignment;
        });

        // Agregar datos
        for (const entrie of data) {
          const dataRow = worksheet.addRow([
            entrie.id,
            entrie.full_name,
            entrie.ci,
            entrie.role,
            entrie.type,
            entrie.turnstile,
            this.date(entrie.createdAt),
          ]);
          dataRow.eachCell((cell) => {
            cell.alignment = dataStyle.alignment;
          });
        }

        // Habilitar filtros de autofiltro en la fila de encabezados
        worksheet.autoFilter = {
          from: { row: 7, column: 1 }, // Fila de encabezados + 1
          to: { row: 7, column: 3 }, // Fila de encabezados + 1
        };

        // Ajustar el ancho de las columnas automáticamente
        worksheet.columns.forEach((column, colIndex) => {
          let maxLength = 0;
          column.eachCell({ includeEmpty: true }, (cell) => {
            const length = cell.value ? cell.value.toString().length : 0;
            maxLength = Math.max(maxLength, length);
          });
          column.width = Math.min(30, maxLength + 2); // Establecer un ancho máximo
        });

        // Generar y descargar el archivo Excel
        const blob = await workbook.xlsx.writeBuffer();
        const blobUrl = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download =
          "ReporteES_" + currentDate.toLocaleDateString() + ".xlsx";
        link.click();
      } catch (error) {
        console.error("Error al generar el Excel:", error);
      }
    },
  },
};
</script>
