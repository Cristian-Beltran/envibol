<template>
  <Forms title="Tarjeta" icon="fa-address-card" @handleSubmit="handleSubmit">
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos de tarjeta
    </h6>

    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Input
          id="rfid"
          labelText="RFID"
          placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
          v-model="v$.rfid.$model"
          :errors="v$.rfid.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Select
          id="typeCardId"
          labelText="Tipo de tarjeta"
          v-model="v$.typeCardId.$model"
          :errors="v$.typeCardId.$errors"
          :options="types"
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
  createCardRequest,
  getCardRequest,
  updateCardRequest,
} from "@/api/card";
import { getTypeCardsRequest } from "@/api/typecard";
import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import Forms from "@/components/Cards/Forms.vue";
import Input from "@/components/Inputs/Input.vue";
import Select from "@/components/Inputs/Select.vue";
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
