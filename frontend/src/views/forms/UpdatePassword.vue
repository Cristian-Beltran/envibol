<template>
  <Forms
    title="Cambiar contraseña"
    icon="fa-password"
    @handleSubmit="handleSubmit"
  >
    <h6 class="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
      Contraseña
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full px-4">
        <Input
          id="oldPassword"
          labelText="Contraseña Actual"
          v-model="v$.oldPassword.$model"
          :errors="v$.oldPassword.$errors"
          type="password"
        />
      </div>
      <div class="w-full px-4">
        <Input
          id="newPassword"
          labelText="Nueva contraseña"
          v-model="v$.newPassword.$model"
          :errors="v$.newPassword.$errors"
          type="password"
        />
      </div>
      <div class="w-full px-4">
        <Input
          id="repeatPassword"
          labelText="Repetir nueva contraseña"
          v-model="v$.repeatPassword.$model"
          :errors="v$.repeatPassword.$errors"
          type="password"
        />
      </div>
    </div>
  </Forms>
</template>

<script setup>
import { updatePassword } from "@/api/auth";

import { useVuelidate } from "@vuelidate/core";
import { required, helpers, sameAs } from "@vuelidate/validators";
import { ref, computed, onMounted, reactive } from "vue";
import { toast } from "vue-sonner";

import Forms from "@/components/Cards/Forms.vue";
import Input from "@/components/Inputs/Input.vue";
import Select from "@/components/Inputs/Select.vue";
const formData = reactive({
  newPassword: "",
  oldPassword: "",
  repeatPassword: "",
});
const rules = {
  newPassword: {
    required: helpers.withMessage("Campo Requerido", required),
  },
  oldPassword: {
    required: helpers.withMessage("Campo requerido", required),
  },
  repeatPassword: {
    required: helpers.withMessage("Campo requerido", required),
  },
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);
async function handleSubmit(event) {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      await updatePassword(formData);
      formData.newPassword = "";
      formData.oldPassword = "";
      formData.repeatPassword = "";
      v$.value.$reset();
      toast.success("Contraseña actualizada");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}
</script>
