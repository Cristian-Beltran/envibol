<template>
  <Forms title="Rol" icon="fa-users" @handleSubmit="handleSubmit">
    <h6 class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase">
      Datos de Rol
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Input id="name" labelText="Nombre" v-model="v$.name.$model" :errors="v$.name.$errors" type="text" />
      </div>
      <div class="w-full lg:w-full px-4">
        <Input id="description" labelText="Descripción" v-model="v$.description.$model" :errors="v$.description.$errors"
          type="text" />
      </div>
    </div>
  </Forms>
</template>

<script setup>

import {
  createRoleRequest,
  getRoleRequest,
  updateRoleRequest,
} from "@/api/role";

import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import { ref, computed, onMounted, reactive } from "vue";
import { toast } from "vue-sonner";

import Forms from "@/components/Cards/Forms.vue";
import Input from "@/components/Inputs/Input.vue";

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
      if (!route.query.id) await createRoleRequest(formData);
      else await updateRoleRequest(route.query.id, formData);
      toast.success("Rol guardado correctamente");
      router.push("/role");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      const res = await getRoleRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error("Error al cargar los datos");
      route.push("/role");
    }
  }
});
</script>
