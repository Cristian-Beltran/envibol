<template>
  <div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              {{ column.label }}
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in displayedItems" :key="item.id">
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              v-for="column in columns"
              :key="column.key"
            >
              <span v-if="column.color">
                <span
                  class="rounded-full border py-1 px-3 border-grayBlue-500"
                  :style="{ backgroundColor: item[column.key] }"
                ></span>
              </span>
              <span v-else-if="column.date">
                {{ date(item[column.key]) }}
              </span>
              <span v-else-if="column.status">
                <span v-if="item[column.key] == 1" class="flex justify-center"
                  ><i
                    class="fas fa-check text-sm rounded-full bg-emerald-600 px-2 py-1 text-white"
                  ></i
                ></span>
                <span v-else class="flex justify-center"
                  ><i
                    class="fas fa-times text-sm rounded-full bg-red-500 px-2 py-1 text-white"
                  ></i
                ></span>
              </span>
              <span v-else-if="column.check">
                <span v-if="item[column.key]" class="flex justify-center"
                  ><i
                    class="fas fa-check text-sm rounded-full bg-emerald-600 px-2 py-1 text-white"
                  ></i
                ></span>
                <span v-else class="flex justify-center"
                  ><i
                    class="fas fa-times text-sm rounded-full bg-red-500 px-2 py-1 text-white"
                  ></i
                ></span>
              </span>
              <span v-else>
                {{ item[column.key] }}
              </span>
            </td>

            <td
              v-if="options.length > 0"
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
            >
              <table-dropdown :options="options" @emit="emit" :id="item.id" />
            </td>
          </tr>
        </tbody>
      </table>
      <hr class="my-4 md:min-w-full border-black" />
      <!-- Buttons pagination-->
      <div class="flex w-full mb-8 justify-center">
        <a
          href="#"
          @click.prevent="changePage(currentPage - 1)"
          class="flex items-center justify-center px-3 h-8 mx-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg"
        >
          <i class="fas fa-arrow-left px-2"></i>
          Previous
        </a>
        <p class="text-sm px-6">Pagina {{ currentPage }} de {{ totalPages }}</p>
        <a
          @click.prevent="changePage(currentPage + 1)"
          class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg"
        >
          Next
          <i class="fas fa-arrow-right px-2"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import TableDropdown from "@/components/Dropdowns/TableDropdown.vue";

export default {
  data() {
    return {
      displayedItems: [],
      currentPage: 1,
    };
  },
  components: {
    TableDropdown,
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
  },
  watch: {
    load() {
      if (!this.load) {
        this.changePage(1);
      }
    },
    itemsPerPage() {
      this.changePage(1);
    },
    items() {
      this.changePage(1);
    },
  },
  methods: {
    changePage(page) {
      if (this.totalPages === 0) {
        this.currentPage = 0;
        this.displayedItems = [];
      }
      else if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        const startIndex = (page - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.displayedItems = this.items.slice(startIndex, endIndex);
      }
    },
    emit(action) {
      this.$emit("action", action);
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
  },

  props: {
    color: {
      default: "light",
      validator: function (value) {
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
    items: {
      default: [],
    },
    columns: {
      default: [],
    },
    load: {
      default: true,
    },
    itemsPerPage: {
      default: 10,
    },
    options: {
      default: [],
    },
  },
};
</script>
