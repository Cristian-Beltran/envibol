<template>
  <Forms title="Usuario externo" icon="fa-user" @handleSubmit="handleSubmit">
    <h6 class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase">
      Datos de visitante
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-6/12 px-4">
        <Input id="first_name" 
          labelText="Nombre/s" 
          v-model="v$.first_name.$model" 
          :errors="v$.first_name.$errors"
          type="text" 
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input 
          id="last_name" 
          labelText="Apellidos" 
          v-model="v$.last_name.$model" 
          :errors="v$.last_name.$errors"
          type="text" 
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input 
          id="ci" 
          labelText="CI" 
          v-model="v$.ci.$model" 
          :errors="v$.ci.$errors" 
          type="text" 
        />
      </div>
    </div>
    <h6 class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase">
      Información de contacto
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Input 
          id="address" 
          labelText="Dirección" 
          v-model="v$.address.$model" 
          :errors="v$.address.$errors" 
          type="text" 
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input 
          id="telf" 
          labelText="Telefóno" 
          v-model="v$.telf.$model" 
          :errors="v$.telf.$errors" 
          type="number" 
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input 
          id="cel" 
          labelText="Celular" 
          v-model="v$.cel.$model" 
          :errors="v$.cel.$errors" 
          type="number" 
        />
      </div>
    </div>
  </Forms>
</template>
<script setup>
import {
  createExternalRequest,
  getExternalRequest,
  updateExternalRequest,
} from "@/api/external";

import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers, email } from "@vuelidate/validators";
import { ref, onMounted, reactive } from "vue";
import { toast } from "vue-sonner";

import Forms from "@/components/Cards/Forms.vue";
import Input from "@/components/Inputs/Input.vue";

const route = useRoute();
const router = useRouter();

const formData = reactive({
  first_name: "",
  last_name: "",
  ci: "",
  address: "",
  telf: "",
  cel: "",
});
const rules = {
  first_name: {
    required: helpers.withMessage("Se requiere el nombre/s", required),
  },
  last_name: {
    required: helpers.withMessage("Se requiere los apellidos", required),
  },
  ci: {
    required: helpers.withMessage("Se requiere el CI", required),
  },
  address: {},
  telf: {},
  cel: {},
}

const v$ = useVuelidate(rules, formData);
const errors = ref([]);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id)
        await createExternalRequest(formData);
      else
        await updateExternalRequest(route.query.id, formData);
      console.log(formData.value);
      toast.success("Externo guardado correctamente");
      router.push("/external");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}
onMounted(async () => {
  try {
    const res = await getExternalRequest(route.query.id)
    Object.assign(formData, res.data);
  } catch (error) {
    toast.error("Error al cargar datos");
    route.push("/external");
  }
});
</script>
