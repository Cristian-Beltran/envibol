<template>
  <Forms title="Empleado" icon="fa-user-tie" @handleSubmit="handleSubmit">
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos de Empleado
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Input
          id="email"
          labelText="Correo electronico"
          v-model="v$.email.$model"
          :errors="v$.email.$errors"
          type="email"
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
      <div class="w-full lg:w-6/12 px-4">
        <Select
          id="role"
          labelText="Rol"
          v-model="v$.roleId.$model"
          :errors="v$.roleId.$errors"
          :options="roles"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Checkbox
          id="staff"
          v-if="profileStore.isAdmin"
          labelText="Acceso del sistema"
          v-model="v$.staff.$model"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Checkbox
          v-if="profileStore.isAdmin"
          id="admin"
          labelText="Permisos de administrador"
          v-model="v$.admin.$model"
        />
      </div>
    </div>
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos de Empleado
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
  </Forms>
</template>

<script setup>
import { getRolesRequest } from "@/api/role";
import {
  createEmployeeRequest,
  getEmployeeRequest,
  updateEmployeedRequest,
} from "@/api/employee";

import { useProfileStore } from "@/stores/profile";
import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers, email } from "@vuelidate/validators";
import { ref, onMounted, reactive, watch } from "vue";
import { toast } from "vue-sonner";

import Forms from "@/components/Cards/Forms.vue";
import Input from "@/components/Inputs/Input.vue";
import Select from "@/components/Inputs/Select.vue";
import Checkbox from "@/components/Inputs/Checkbox.vue";

const profileStore = useProfileStore();
const route = useRoute();
const router = useRouter();
const formData = reactive({
  first_name: "",
  last_name: "",
  email: "",
  roleId: "",
  ci: "",
  telf: "",
  address: "",
  cel: "",
  staff: false,
  admin: false,
});
const rules = {
  email: {
    required: helpers.withMessage("El correo es requerido", required),
    email: helpers.withMessage("El correo no es valido", email),
  },
  first_name: {
    required: helpers.withMessage("Se requiere el nombre/s", required),
  },
  last_name: {
    required: helpers.withMessage("Se requiere los apellidos", required),
  },
  ci: { required: helpers.withMessage("Se requiere el CI", required) },
  roleId: {
    required: helpers.withMessage("Se requiere ingresar un rol", required),
  },
  address: {},
  telf: {},
  cel: {},
  password: {},
  staff: {},
  admin: {},
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);
const roles = ref([]);

watch(
  () => formData.admin,
  (admin) => {
    if (admin && !formData.staff) {
      formData.staff = true;
    }
  }
);
watch(
  () => formData.staff,
  (staff) => {
    if (!staff && formData.admin) {
      formData.admin = false;
    }
  }
);
async function handleSubmit(event) {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) {
        formData.password = `Env${formData.ci}`;
        await createEmployeeRequest(formData);
      } else await updateEmployeedRequest(route.query.id, formData);
      toast.success("Empleado guardado correctamente");
      router.push("/employee");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}
onMounted(async () => {
  try {
    const res = await getRolesRequest();
    roles.value = res.data;
  } catch (error) {
    toast.error("Error al cargar los datos");
  }
  if (route.query.id) {
    try {
      const res = await getEmployeeRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error al cargar los datos");
      route.push("/employee");
    }
  }
});
</script>
