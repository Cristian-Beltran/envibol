<template>
  <Forms title="Tarjeta" icon="fa-address-card" @handleSubmit="handleSubmit">
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos de tarjeta
    </h6>

    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            RFID
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="text"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Tipo de tarjeta
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.typeCardId.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <select
            v-model="v$.typeCardId.$model"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled value="">Seleccionar una opción</option>
            <option v-for="item in types" :value="item.id" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Descripción
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.description.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.description.$model"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  </Forms>
</template>

<script setup>
import {
  createCardRequest,
  getCardRequest,
  updateCardRequest,
} from "@/api/card";
import { getTypeCardsRequest } from "@/api/typecard";

import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import Forms from "@/components/Cards/Forms.vue";
import { ref, computed, onMounted, reactive } from "vue";
import { toast } from "vue-sonner";

const route = useRoute();
const router = useRouter();
const formData = reactive({
  rfid: "",
  typeCardId: "",
  description: "",
});
const errors = ref([]);
const types = ref([]);
const rules = computed(() => ({
  rfid: {
    required: helpers.withMessage("El codigo rfid es requerido", required),
  },
  typeCardId: {
    required: helpers.withMessage("El tipo de tarjeta es requerido", required),
  },
  description: {
    required: helpers.withMessage("Se requiere una descripción", required),
  },
}));

const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) await createCardRequest(formData);
      else await updateCardRequest(route.query.id, formData);
      toast.success("Tarjeta guardada correctamente");
      router.push("/card");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted(async () => {
  try {
    const res = await getTypeCardsRequest();
    types.value = res.data;
  } catch (error) {
    toast.error("Error al cargar los datos");
  }
  if (route.query.id) {
    try {
      const res = await getCardRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error("Error al cargar los datos");
      route.push("/card");
    }
  }
});
</script>
