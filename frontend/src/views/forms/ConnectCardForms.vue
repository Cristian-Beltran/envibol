<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">
              Asignando Tarjeta
            </h6>
          </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form :onSubmit="handleSubmit">
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Datos de empleado
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
                    htmlFor="grid-password"
                  >
                    Correo electronico
                  </label>
                  <input
                    disabled
                    v-model="userData.email"
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

                  <input
                    disabled
                    v-model="userData.first_name"
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

                  <input
                    disabled
                    v-model="userData.last_name"
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
                    Rol
                  </label>

                  <select
                    disabled
                    v-model="userData.roleId"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option disabled value="">Seleccionar una opción</option>
                    <option
                      v-for="item in roles"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />

            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Informacion de Tarjeta
            </h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-full px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Tipo de tarjeta
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.type.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.type.$model"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option disabled value="">Seleccionar una opción</option>
                    <option
                      v-for="item in types"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-full px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Tarjeta
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.type.$errors"
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
                  <router-link to="/admin/employee" v-slot="{ href, navigate }">
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
