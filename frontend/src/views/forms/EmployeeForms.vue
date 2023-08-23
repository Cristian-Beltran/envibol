<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">Empleado</h6>
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
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.email.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <input
                    v-model="v$.formData.email.$model"
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
              <div class="w-full lg:w-6/12 px-4">
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
                  >
                    Rol
                  </label>
                  <div
                    class="p-1 mb-1"
                    v-for="(error, index) of v$.formData.roleId.$errors"
                    :key="index"
                  >
                    <p class="text-sm text-red-500">{{ error.$message }}</p>
                  </div>
                  <select
                    v-model="v$.formData.roleId.$model"
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
              <div class="w-full lg:w-6/12 px-4" v-if="$store.getters.isAdmin">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Acceso al sistema
                  </label>
                  <input
                    v-model="v$.formData.staff.$model"
                    type="checkbox"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4" v-if="$store.getters.isAdmin">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Permisos de administrador
                  </label>
                  <input
                    v-model="v$.formData.admin.$model"
                    type="checkbox"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150"
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
import { required, helpers, email } from "@vuelidate/validators";
import { getRolesRequest } from "../../api/role";
import {
  createEmployeeRequest,
  getEmployeeRequest,
  updateEmployeedRequest,
} from "../../api/employee";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      formData: {
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
      },
      errors: [],
      roles: [],
      alertOpen: false,
    };
  },
  validations() {
    return {
      formData: {
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
          required: helpers.withMessage(
            "Se requiere ingresar un rol",
            required
          ),
        },
        address: {},
        telf: {},
        cel: {},
        password: {},
        staff: {},
        admin: {},
      },
    };
  },
  watch: {
    "formData.admin"(newValue, oldValue) {
      if (newValue && !this.formData.staff) {
        this.formData.staff = true;
      }
    },
    "formData.staff"(newValue, oldValue) {
      if (!newValue && this.formData.admin) {
        this.formData.admin = false;
      }
    },
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
            if (!this.$route.query.id) {
              this.formData.password = `Env${this.formData.ci}`;
              await createEmployeeRequest(this.formData);
            } else
              await updateEmployeedRequest(this.$route.query.id, this.formData);
            this.$router.push("/admin/employee");
          } catch (error) {
            this.errors = error.response.data.errors;
            this.notification();
          }
        };
        request();
      }
    },
  },
  async created() {
    try {
      const res = await getRolesRequest();
      this.roles = res.data;
    } catch (error) {
      console.log(error);
    }
    if (this.$route.query.id) {
      const res = await getEmployeeRequest(this.$route.query.id);
      this.formData = res.data;
    }
  },
};
</script>
