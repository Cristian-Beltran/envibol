<template>
  <Forms title="Tarjeta" icon="fa-address-card" @handleSubmit="handleSubmit">
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos de visitante
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-6/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Nombre/s
          </label>

          <input
            disabled
            v-model="userData.first_name"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div class="w-full lg:w-6/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Apellidos
          </label>

          <input
            disabled
            v-model="userData.last_name"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </div>
    <hr class="mt-6 border-b-1 border-blueGray-300" />

    <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
      Informacion de Tarjeta
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Tarjeta
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.card.$errors"
            :key="index"
          >
            <p class="text-sm text-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <select
            v-model="v$.card.$model"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled value="">Seleccionar una opción</option>
            <option v-for="item in cards" :value="item.id" :key="item.id">
              {{ item.description }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </Forms>
</template>

<script setup>
import {
  connectCardRequest,
  getCardExternalRequest,
  getCardsExternalRequest,
} from "@/api/card";
import { getExternalRequest } from "@/api/external";

import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import Forms from "@/components/Cards/Forms.vue";
import { ref, computed, onMounted, reactive } from "vue";
import { toast } from "vue-sonner";

const route = useRoute();
const router = useRouter();
const userData = ref({});
const formData = reactive({
  card: "",
});
const errors = ref([]);
const cards = ref([]);
const rules = computed(() => ({
  card: {
    required: helpers.withMessage("La tarjeta es requerido", required),
  },
}));

const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      const userId = {
        userId: userData.value.userId,
      };
      await connectCardRequest(formData.card, userId);
      toast.success("Tarjeta vinculada correctamnte");
      router.push("/external");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted(async () => {
  try {
    const res = await getExternalRequest(route.query.id);
    userData.value = res.data;
  } catch (error) {
    toast.error("Error al obtener los datos del visitante");
  }
  try {
    const card = await getCardExternalRequest(route.query.id);
    Object.assign(formData, res.card);
  } catch (error) {
    toast("El usuario no tiene tarjeta vinculada");
  }
  try {
    const res = await getCardsExternalRequest(userData.value.userId);
    cards.value = res.data;
  } catch (error) {
    toast.error("Error al obtener los datos de las tarjetas");
  }
});
</script>
