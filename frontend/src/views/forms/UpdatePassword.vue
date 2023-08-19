<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">
              Actualizar contraseña
            </h6>
          </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form :onSubmit="handleSubmit">
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Contraseña
            </h6>
            <div
              v-if="alertOpen"
              class="text-white px-6 py-4 border-0 rounded relative bg-lightBlue-500"
            >
              <span class="inline-block align-middle mr-8">
                <b class="capitalize">Actualizado</b> Contraseña actualizada
              </span>
              <button
                class="absolute bg-transparent text-2xl font-semibold leading-none right-0 mr-4 top-0 mt-4 outline-none focus:outline-none"
                v-on:click="closeAlert()"
              >
                <span>x</span>
              </button>
            </div>
            <div v-if="errorsOpen">
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
                    Contraseña Actual
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.oldPassword.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    v-model="v$.formData.oldPassword.$model"
                    :type="showPassword ? 'text' : 'password'"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div class="w-full lg:w-full px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nueva Contraseña
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.newPassword.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    v-model="v$.formData.newPassword.$model"
                    :type="showPassword ? 'text' : 'password'"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-full px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Repetir Contraseña
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.repeatPassword.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    v-model="v$.formData.repeatPassword.$model"
                    :type="showPassword ? 'text' : 'password'"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <div class="w-full mx-auto p-4 md:py-8">
              <div class="flex items-center justify-between">
                <div class="text-center flex items-center mb-4">
                  <button
                    @click="changeShowPassword"
                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <span v-if="showPassword">Ocultar contraseña</span>
                    <span v-else>Mostrar contraseña</span>
                  </button>
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
import { required, helpers, sameAs } from "@vuelidate/validators";
import { updatePassword } from "../../api/auth";
export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      formData: {
        newPassword: "",
        oldPassword: "",
        repeatPassword: "",
      },
      errors: [],
      showPassword: false,
      alertOpen: false,
      errorsOpen: false,
    };
  },
  validations() {
    return {
      formData: {
        newPassword: {
          required: helpers.withMessage("Campo Requerido", required),
        },
        oldPassword: {
          required: helpers.withMessage("Campo requerido", required),
        },
        repeatPassword: {
          required: helpers.withMessage("Campo requerido", required),
          sameAs: helpers.withMessage(
            "Las contraseña no son iguales",
            sameAs(this.formData.newPassword)
          ),
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
    changeShowPassword() {
      this.showPassword = !this.showPassword;
      console.log(this.showPassword);
    },
    notificationError() {
      this.errorsOpen = true;
      const timer = setTimeout(() => {
        this.errorsOpen = false;
      }, 3000);
      return () => clearTimeout(timer);
    },
    handleSubmit(event) {
      event.preventDefault();
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const request = async () => {
          try {
            await updatePassword(this.formData);
            this.formData = {
              newPassword: "",
              oldPassword: "",
              repeatPassword: "",
            };
            this.v$.$reset();
            this.notification();
          } catch (error) {
            this.errors = error.response.data.errors;
            this.notificationError();
          }
        };
        request();
      }
    },
  },
};
</script>
