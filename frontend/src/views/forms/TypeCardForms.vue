<template>
  <Forms
    title="Tipo de tarjeta"
    icon="fa-address-card"
    @handleSubmit="handleSubmit"
  >
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos de tipo de tarjeta
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Input
          id="name"
          labelText="Nombre"
          v-model="v$.name.$model"
          :errors="v$.name.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="color"
          labelText="Color"
          v-model="v$.color.$model"
          :errors="v$.color.$errors"
          type="color"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="description"
          labelText="Descripción"
          v-model="v$.description.$model"
          :errors="v$.description.$errors"
          type="text"
        />
      </div>
    </div>
  </Forms>
</template>

<script setup>
import {
  createTypeCardRequest,
  getTypeCardRequest,
  updateTypeCardRequest,
} from "@/api/typecard";

import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import { ref, computed, onMounted, reactive } from "vue";
import { toast } from "vue-sonner";

import Forms from "@/components/Cards/Forms.vue";
import Input from "@/components/Inputs/Input.vue";
import Select from "@/components/Inputs/Select.vue";

const route = useRoute();
const router = useRouter();
const formData = reactive({
  name: "",
  color: "",
  description: "",
});
const errors = ref([]);
const rules = {
  name: {
    required: helpers.withMessage("Se requiere un nombre", required),
  },
  color: {
    required: helpers.withMessage("Se requiere un color", required),
  },
  description: {
    required: helpers.withMessage("Se requiere una descripción", required),
  },
};
const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) await createTypeCardRequest(formData);
      else await updateTypeCardRequest(route.query.id, formData);
      toast.success("Tipo de tarjeta guardada correctamente");
      router.push("/typecard");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}
onMounted(async () => {
  if (route.query.id) {
    const res = await getTypeCardRequest(route.query.id);
    Object.assign(formData, res.data);
  }
});
</script>
