<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">Mi cuenta</h6>
      </div>

      <div
        v-if="alertOpen"
        class="text-white px-6 py-4 border-0 rounded relative bg-lightBlue-500"
      >
        <span class="inline-block align-middle mr-8">
          <b class="capitalize">Actualizado</b> Informacion de usuario
          actualizada
        </span>
        <button
          class="absolute bg-transparent text-2xl font-semibold leading-none right-0 mr-4 top-0 mt-4 outline-none focus:outline-none"
          v-on:click="closeAlert()"
        >
          <span>x</span>
        </button>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form :onSubmit="handleSubmit">
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Infomacion de usuario
        </h6>

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
                v-model="v$.formData.email.$model"
                disabled
                type="email"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
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
                type="text"
                v-model="v$.formData.first_name.$model"
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
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                CI
              </label>
              <input
                v-model="v$.formData.ci.$model"
                type="number"
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

          <div class="w-full mx-auto p-4 md:py-8">
            <div class="flex items-center justify-between">
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
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { updateProfileRequest } from "../../api/auth";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      formData: this.$store.getters.dataUser,
      errors: [],
      alertOpen: false,
    };
  },
  validations() {
    return {
      formData: {
        email: {},
        first_name: {
          required: helpers.withMessage("El correo es requerido", required),
        },
        last_name: {
          required: helpers.withMessage("El password es requerido", required),
        },
        address: {},
        telf: {},
        cel: {},
        ci: {
          required: helpers.withMessage("El ci es requerido", required),
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
            const res = await updateProfileRequest(this.formData);
            this.$store.commit("SET_USER", res.data);
            this.notification();
          } catch (error) {
            console.log(error);
          }
        };
        request();
      }
    },
    closeAlert: function () {
      this.alertOpen = false;
    },
  },
};
</script>
