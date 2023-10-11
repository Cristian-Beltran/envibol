<template>
  <Forms
    title="Informacioón de usuario"
    icon="fa-user"
    @handleSubmit="handleSubmit"
  >
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Perfil de usuario
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Input
          id="email"
          labelText="Correo electronico"
          v-model="v$.email.$model"
          :errors="v$.email.$errors"
          type="email"
          disabled
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
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Información de contacto
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full px-4">
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
  </Forms>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { updateProfileRequest } from "@/api/auth";
import { toast } from "vue-sonner";
import { onMounted, reactive } from "vue";
import { useProfileStore } from "@/stores/profile";

import Forms from "@/components/Cards/Forms.vue";
import Input from "@/components/Inputs/Input.vue";
import { useRoute, useRouter } from "vue-router";

const profileStore = useProfileStore();
const route = useRoute();
const router = useRouter();
const formData = reactive({
  email: "",
  first_name: "",
  last_name: "",
  address: "",
  telf: "",
  cel: "",
  ci: "",
});

const rules = {
  email: {
    required: helpers.withMessage("El correo es requerido", required),
  },
  first_name: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
  last_name: {
    required: helpers.withMessage("El apellido es requerido", required),
  },
  address: {},
  telf: {},
  cel: {},
  ci: {
    required: helpers.withMessage("El ci es requerido", required),
  },
};
const v$ = useVuelidate(rules, formData);
async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      const res = await updateProfileRequest(formData);
      profileStore.user = res.data;
      toast.success("Informacion actualizada correctamente");
    } catch (error) {
      error.response.data.errors.map((item) => toast.error(item));
    }
  }
}
onMounted(() => {
  Object.assign(formData, profileStore.dataUser);
});
</script>
