<template>
  <Forms title="Visita" icon="fa-user-edit" @handleSubmit="handleSubmit">
    <h6 class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase">
      Datos de Visitante
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Input id="reason" labelText="Razón de visita" v-model="v$.reason.$model" :errors="v$.reason.$errors"
          type="text" />
      </div>
      <div class="w-full lg:w-full px-4">
        <Input id="ci" labelText="CI" v-model="v$.ci.$model" :errors="v$.ci.$errors" type="text" />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input id="first_name" labelText="Nombre/s" v-model="v$.first_name.$model" :errors="v$.first_name.$errors"
          type="text" />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input id="last_name" labelText="Apellidos" v-model="v$.last_name.$model" :errors="v$.last_name.$errors"
          type="text" />
      </div>
    </div>
    <h6 class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase">
      Información de contacto
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full l:w-full px-4">
        <Input id="address" labelText="Dirección" v-model="v$.address.$model" :errors="v$.address.$errors" type="text" />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input id="telf" labelText="Telefono" v-model="v$.telf.$model" :errors="v$.telf.$errors" type="number" />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input id="cel" labelText="Celular" v-model="v$.cel.$model" :errors="v$.cel.$errors" type="number" />
      </div>
    </div>
    <h6 class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase">
      Vincular tarjeta
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Select id="card" labelText="Tarjeta" v-model="v$.card.$model" :errors="v$.card.$errors" :options="cards" />
      </div>
    </div>
  </Forms>
</template>
<!--
<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">Visita</h6>
          </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form :onSubmit="handleSubmit">
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Datos de Visitante
            </h6>
            <div v-if="alertOpen">
              <div
                v-for="(item, index) in errors"
                :key="index"
                className="bg-red-500 p-2 text-white rounded-lg mb-2 text-center"
              >
                {{ item }}
              </div>
            </div>

            <div class="flex flex-wrap">
              <div class="w-full lg:w-full px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Razon de visita
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.reason.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    v-model="v$.formData.reason.$model"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-full px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    CI
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.ci.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    @blur="handleBlur"
                    v-model="v$.formData.ci.$model"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre/s
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.first_name.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    v-model="v$.formData.first_name.$model"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Apellidos
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.last_name.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    v-model="v$.formData.last_name.$model"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />

            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Informacion de contacto
            </h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Direccion
                  </label>
                  <input
                    type="text"
                    v-model="v$.formData.address.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Telefono
                  </label>
                  <input
                    type="number"
                    v-model="v$.formData.telf.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Celular
                  </label>
                  <input
                    v-model="v$.formData.cel.$model"
                    type="number"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Vincular tarjeta
            </h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-full px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Tarjeta
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.card.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.card.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option disabled value="">Seleccionar una opción</option>
                    <option
                      v-for="item in cards"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.description }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="w-full mx-auto p-4 md:py-8">
              <div class="flex items-center justify-between">
                <div class="text-center flex items-center mb-4">
                  <router-link to="/admin/visit" v-slot="{ href, navigate }">
                    <button
                      :href="href"
                      :click="navigate"
                      class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      <span><i class="fas fa-arrow-left"></i> Atras</span>
                    </button>
                  </router-link>
                </div>
                <div class="text-center flex items-center mb-4">
                  <button
                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    <span>Guardar <i class="fas fa-save"></i></span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
-->


<script setup>
import { createVisitRequest } from "@/api/visit";
import { getCardsExternalRequest } from "@/api/card";
import { getExternalCiRequest } from "@/api/external";

import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import { ref, onMounted, reactive } from "vue";
import { toast } from "vue-sonner";

import Forms from "@/components/Cards/Forms.vue";
import Input from "@/components/Inputs/Input.vue";
import Select from "@/components/Inputs/Select.vue";

const route = useRoute();
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
  reason: ""
});
const rules = {
  first_name: {
    required: helpers.withMessage("Se requiere el nombre/s", required),
  },
  last_name: {
    required: helpers.withMessage("Se requiere los apellidos", required),
  },
  ci: {
    required: helpers.withMessage("Se requiere el CI", required)
  },
  address: {},
  telf: {},
  cel: {},
  card: {
    required: helpers.withMessage("Se requiere una tarjeta", required),
  },
  reason: {
    required: helpers.withMessage("Se requiere una razon", required),
  }
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);
const cards = ref([]);
//const roles = ref([]);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) {
        await createVisitRequest(formData);
      } //else await updateEmployeedRequest(route.query.id, formData);
      toast.success("Visita guardada correctamente");
      router.push("/visit");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
};

onMounted(async () => {
  try {
    const res = await getCardsExternalRequest();
    cards.value = res.data;
  } catch (error) {
    toast.error("Error al cargar los datos");
  }
  if (route.query.id) {
    try {
      const res = await getExternalCiRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error al cargar los datos");
      route.push("/visit");
    }
  }
});
</script>

<!--
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { createVisitRequest } from "../../api/visit";
import { getCardsExternalRequest } from "../../api/card";
import { getExternalCiRequest } from "../../api/external";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      formData: {
        id: "",
        ci: "",
        first_name: "",
        last_name: "",
        telf: "",
        address: "",
        cel: "",
        card: "",
        reason: "",
      },
      errors: [],
      cards: [],
      roles: [],
      alertOpen: false,
    };
  },
  validations() {
    return {
      formData: {
        first_name: {
          required: helpers.withMessage("Se requiere el nombre/s", required),
        },
        last_name: {
          required: helpers.withMessage("Se requiere los apellidos", required),
        },
        ci: { required: helpers.withMessage("Se requiere el CI", required) },

        address: {},
        telf: {},
        cel: {},
        card: {
          required: helpers.withMessage("Se requiere una tarjeta", required),
        },
        reason: {
          required: helpers.withMessage("Se requiere una razon", required),
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
            await createVisitRequest(this.formData);
            this.$router.push("/admin/visit");
          } catch (error) {
            this.errors = error.response.data.errors;
            this.notification();
          }
        };
        request();
      }
    },
    async handleBlur() {
      try {
        const res = await getExternalCiRequest(this.formData.ci);
        console.log(res.data);
        const cards = await getCardsExternalRequest(
          res.data.userId ? res.data.userId : ""
        );
        this.cards = cards.data;
        let reason = this.formData.reason;
        if (res.data.id) this.formData = res.data;
        this.formData.reason = reason;
        if (res.data.card) this.formData.card = res.data.card.id;
        console.log(this.formData);
      } catch (error) {
        console.log(error);
        this.errors = error.response.data.errors;
        this.notification();
        this.formData = {
          id: "",
          ci: "",
          first_name: "",
          last_name: "",
          telf: "",
          address: "",
          cel: "",
          card: "",
          reason: "",
        };
      }
    },
  },
};
</script>
-->