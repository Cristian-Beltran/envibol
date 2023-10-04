<template>
  <Forms title="Visita" icon="fa-user-edit" @handleSubmit="handleSubmit">
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos de Visitante
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Input
          id="reason"
          labelText="Razón de visita"
          v-model="v$.reason.$model"
          :errors="v$.reason.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-full px-4">
        <Input
          id="ci"
          labelText="CI"
          @blur="handleBlur"
          v-model="v$.ci.$model"
          :errors="v$.ci.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="first_name"
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
    </div>
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Información de contacto
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full l:w-full px-4">
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
          labelText="Telefono"
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
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Vincular tarjeta
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Select
          id="card"
          labelText="Tarjeta"
          v-model="v$.card.$model"
          :errors="v$.card.$errors"
          :options="cardsData"
          name="description"
        />
      </div>
    </div>
  </Forms>
</template>

<script setup>
import { createVisitRequest } from "@/api/visit";
import { getCardsExternalRequest } from "@/api/card";
import { getExternalCiRequest } from "@/api/external";

import { useVuelidate } from "@vuelidate/core";
import { useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import { ref, reactive, watch } from "vue";
import { toast } from "vue-sonner";

import Forms from "@/components/Cards/Forms.vue";
import Input from "@/components/Inputs/Input.vue";
import Select from "@/components/Inputs/Select.vue";

const router = useRouter();
const formData = reactive({
  id: "",
  ci: "",
  first_name: "",
  last_name: "",
  telf: "",
  address: "",
  cel: "",
  card: "",
  reason: "",
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
  card: {
    required: helpers.withMessage("Se requiere una tarjeta", required),
  },
  reason: {
    required: helpers.withMessage("Se requiere una razon", required),
  },
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);
const cardsData = ref([]);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      await createVisitRequest(formData);
      toast.success("Visita guardada correctamente");
      router.push("/visit");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

async function handleBlur() {
  try {
    console.log("blur");
    const res = await getExternalCiRequest(formData.ci);
    const cards = await getCardsExternalRequest(
      res.data.userId ? res.data.userId : ""
    );
    console.log(formData.card);
    cardsData.value = cards.data;
    console.log(cardsData.value);
    let reason = formData.reason;
    if (res.data.id) Object.assign(formData, res.data);
    formData.reason = reason;
    if (res.data.card) formData.card = res.data.card.id;
  } catch (error) {
    errors.value = error.response.data.errors;
    errors.value.map((item) => toast.error(item));
    formData.id = "";
    formData.ci = "";
    formData.first_name = "";
    formData.last_name = "";
    formData.telf = "";
    formData.address = "";
    formData.cel = "";
    formData.card = "";
    formData.reason = "";
  }
}
</script>
