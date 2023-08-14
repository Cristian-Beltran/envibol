<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-xl font-bold">Login</h6>
            </div>

            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form :onSubmit="handleSubmit">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <div
                  class="p-1 mb-1"
                  v-for="(error, index) of v$.formData.email.$errors"
                  :key="index"
                >
                  <p class="text-sm text-red-500">{{ error.$message }}</p>
                </div>
                <input
                  v-model="v$.formData.email.$model"
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <div
                  class="p-1 mb-1"
                  v-for="(error, index) of v$.formData.password.$errors"
                  :key="index"
                >
                  <p class="text-sm text-red-500">{{ error.$message }}</p>
                </div>
                <input
                  v-model="v$.formData.password.$model"
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$store.state.user">
      {{ $store.state.user }}
    </div>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { loginRequest } from "../../api/auth";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  validations() {
    return {
      formData: {
        email: {
          required: helpers.withMessage("El correo es requerido", required),
          email: helpers.withMessage("El correo no es valido", email),
        },
        password: {
          required: helpers.withMessage("El password es requerido", required),
          minLength: helpers.withMessage(
            ({ $params }) =>
              `La contraseña ser de minimo ${$params.min} caracteres`,
            minLength(8)
          ),
        },
      },
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const request = async () => {
          try {
            const res = await loginRequest(this.formData);
            this.$store.commit("SET_USER", res.data);
            this.$router.push("/admin/dashboard");
          } catch (error) {
            console.log(error);
          }
        };
        request();
      }
    },
  },
};
</script>
