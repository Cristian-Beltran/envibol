<template>
  <Forms title="Tarjeta" icon="fa-address-card" @handleSubmit="handleSubmit">
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos de visitante
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="first_name"
          labelText="Nombre/s"
          v-model="userData.first_name"
          type="text"
          disabled="true"
        />
      </div>

      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="last_name"
          labelText="Apellidos"
          v-model="userData.last_name"
          type="text"
        />
      </div>
    </div>

    <h6 class="text-white text-sm mt-3 mb-6 font-bold uppercase">
      Informacion de Tarjeta
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Select
          id="card"
          labelText="Tarjeta"
          v-model="v$.card.$model"
          name="description"
          :errors="v$.card.$errors"
          :options="cards"
        />
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
import Input from "@/components/Inputs/Input.vue";
import Select from "@/components/Inputs/Select.vue";
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
    Object.assign(formData, card.data);
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
