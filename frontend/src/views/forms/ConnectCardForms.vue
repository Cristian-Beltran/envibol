<template>
  <Forms
    title="Asignando tarjeta"
    icon="fa-address-card"
    @handleSubmit="handleSubmit"
  >
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
          v-model="userData.email"
          type="email"
          disabled="true"
        />
      </div>
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
          disabled="true"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Select
          id="role"
          labelText="Rol"
          v-model="userData.roleId"
          :options="roles"
          disabled="true"
        />
      </div>
    </div>
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Información de Tarjeta
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Select
          id="type"
          labelText="Tipo de tarjeta"
          v-model="v$.type.$model"
          :errors="v$.type.$errors"
          :options="types"
        />
      </div>
      <div class="w-full lg:w-full px-4">
        <Select
          id="card"
          labelText="Tarjeta"
          v-model="v$.card.$model"
          :errors="v$.card.$errors"
          :options="cardsData"
          name="description"
          :disabled="!formData.type"
        />
      </div>
    </div>
  </Forms>
</template>

<script setup>
import { getRolesRequest } from "@/api/role";
import { getTypeCardsRequest } from "@/api/typecard";
import {
  getCardsTypeRequest,
  connectCardRequest,
  getCardEmployeeRequest,
} from "@/api/card";
import { getEmployeeRequest } from "@/api/employee";

import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";

import { ref, computed, onMounted, reactive, watch } from "vue";
import { toast } from "vue-sonner";

import Forms from "@/components/Cards/Forms.vue";
import Input from "@/components/Inputs/Input.vue";
import Select from "@/components/Inputs/Select.vue";

const route = useRoute();
const router = useRouter();
const userData = ref({
  first_name: "",
  last_name: "",
  email: "",
  roleId: "",
});
const formData = reactive({
  type: "",
  card: "",
});
const errors = ref([]);
const roles = ref([]);
const types = ref([]);
const cardsData = ref([]);
const rules = computed(() => ({
  type: {
    required: helpers.withMessage("Se requiere un tipo de tarjeta", required),
  },
  card: {
    required: helpers.withMessage("Se requiere una tarjeta", required),
  },
}));

const v$ = useVuelidate(rules, formData);

watch(
  () => formData.type,
  (type) => {
    loadCards();
  }
);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      const userId = {
        userId: userData.value.userId,
      };
      await connectCardRequest(formData.card, userId);
      toast.success("Tarjeta vinculada correctamnte");
      router.push("/employee");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

async function loadCards() {
  console.log("cargando cards");
  try {
    const res = await getCardsTypeRequest(formData.type, userData.value.userId);
    cardsData.value = res.data;
  } catch (error) {
    toast, error("Error al obtener los datos de las tarjetas");
  }
}

onMounted(async () => {
  try {
    const dataEmployee = await getEmployeeRequest(route.query.id);
    userData.value = dataEmployee.data;
    const res = await getRolesRequest();
    roles.value = res.data;
  } catch (error) {
    toast.error("Error al obtener los datos del empleado");
  }
  try {
    const card = await getCardEmployeeRequest(route.query.id);
    Object.assign(formData, card.data);
    loadCards();
  } catch (error) {
    toast("El empleado no tiene tarjeta vinculada");
  }
  try {
    const res = await getTypeCardsRequest();
    types.value = res.data;
  } catch (error) {
    toast.error("Error al obtener tipos de tarjetas");
  }
  /*try {
    const res = await getCardsTypeRequest(formData.type, userData.value.userId);
    cards.value = res.data;
    console.log("tarjetas", cards.value);
  } catch (error) {
    toast, error("Error al obtener los datos de las tarjetas");
  }*/
});
</script>

<!--
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { getRolesRequest } from "../../api/role";
import { getTypeCardsRequest } from "../../api/typecard";
import {
  getCardsTypeRequest,
  connectCardRequest,
  getCardEmployeeRequest,
} from "../../api/card";
import { getEmployeeRequest } from "../../api/employee";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      userData: {
        first_name: "",
        last_name: "",
        email: "",
        roleId: "",
      },
      formData: {
        type: "",
        card: "",
      },
      errors: [],
      roles: [],
      types: [],
      cards: [],
      alertOpen: false,
    };
  },
  watch: {
    "formData.type"(newValue, oldValue) {
      if (oldValue != newValue) {
        this.loadCards();
      }
    },
  },
  validations() {
    return {
      formData: {
        type: {
          required: helpers.withMessage(
            "Se requiere un tipo de tarjeta",
            required
          ),
        },
        card: {
          required: helpers.withMessage("Se requiere una tarjeta", required),
        },
      },
    };
  },
  methods: {
    notification() {
      this.alertOpen = true;
      const timer = setTimeout(() => {
        this.alertOpen = false;
      }, 3000);
      return () => clearTimeout(timer);
    },
    handleSubmit(event) {
      event.preventDefault();
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const request = async () => {
          try {
            const userId = {
              userId: this.userData.userId,
            };
            await connectCardRequest(this.formData.card, userId);
            this.$router.push("/admin/employee");
          } catch (error) {
            this.errors = error.response.data.errors;
            this.notification();
          }
        };
        request();
      }
    },
    async loadCards() {
      try {
        const res = await getCardsTypeRequest(
          this.formData.type,
          this.userData.userId
        );
        this.cards = res.data;
        console.log("cards llenado?",this.cards);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    try {
      const roles = await getRolesRequest();
      this.roles = roles.data;
      const dataEmployee = await getEmployeeRequest(this.$route.query.id);
      this.userData = dataEmployee.data;
      const types = await getTypeCardsRequest();
      this.types = types.data;
    } catch (error) {
      console.log(error);
    }
    try {
      const card = await getCardEmployeeRequest(this.$route.query.id);
      this.formData = card.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
-->
