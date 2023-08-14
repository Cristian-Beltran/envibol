<template>
  <div>
    <a
      class="text-blueGray-500 block"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <div class="items-center flex">
        
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="..."
            class="w-full rounded-full align-middle border-none shadow-lg"
            :src="image"
          />
        </span>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        href="javascript:void(0);"
        class="text-sm border-b py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Acciones
      </a>
      <router-link to="/admin/settings" v-slot="{ href, navigate }">
        <a
          :href="href"
          @click="
            () => {
              navigate;
              dropdownPopoverShow = false;
            }
          "
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Mi informacion
        </a>
      </router-link>

      <router-link to="/admin/settings" v-slot="{ href, navigate }">
        <a
          :href="href"
          @click="
            () => {
              navigate;
              dropdownPopoverShow = false;
            }
          "
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Actualizar contraseña
        </a>
      </router-link>
      <div class="h-0 my-2 border border-solid border-blueGray-100" />

      <router-link to="/auth/login" v-slot="{ href, navigate }">
        <a
          :href="href"
          @click="
            () => {
              navigate;
              dropdownPopoverShow = false;
            }
          "
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Logout
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

import image from "@/assets/img/team-1-800x800.jpg";

export default {
  data() {
    return {
      dropdownPopoverShow: false,
      image: image,
    };
  },
  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
  created() {
    console.log(this.$store.user);
  },
};
</script>
