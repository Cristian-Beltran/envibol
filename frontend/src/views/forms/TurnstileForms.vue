<template>
  <Forms title="Molinete" icon="gi-turnstile" @handleSubmit="handleSubmit">
    <h6 class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase">
      Datos del molinete
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <div class="relative w-full mb-3">
          <label class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2">
            Nombre
          </label>
          <div class="p-1 mb-1" v-for="(error, index) of v$.name.$errors" :key="index">
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input v-model="v$.name.$model" type="text" placeholder=""
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
      </div>
      <div class="w-full lg:w-full px-4">
        <div class="relative w-full mb-3">
          <label class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2">
            Descripción
          </label>
          <div class="p-1 mb-1" v-for="(error, index) of v$.description.$errors" :key="index">
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input v-model="v$.description.$model" type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
      </div>
    </div>
  </Forms>
</template>

<script setup>
import {
  createTurnstileRequest,
  getTurnstileRequest,
  updateTurnstileRequest,
} from "@/api/turnstile";

import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import Forms from "@/components/Cards/Forms.vue";
import { ref, computed, onMounted, reactive } from "vue";
import { toast } from "vue-sonner";

const route = useRoute();
const router = useRouter();
const formData = reactive({
  name: "",
  description: "",
});
const errors = ref([]);
const rules = computed(() => ({
  name: {
    required: helpers.withMessage("Se requiere el nombre", required),
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
      if (!route.query.id) await createTurnstileRequest(formData);
      else await updateTurnstileRequest(route.query.id, formData);
      toast.success("Molinete guardado correctamente");
      router.push("/admin/turnstile");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      const res = await getTurnstileRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error("Error al cargar los datos");
      route.push("/admin/turnstile");
    }
  }
});
</script>
