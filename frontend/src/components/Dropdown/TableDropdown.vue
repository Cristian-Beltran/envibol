<template>
    <div>
      <a
        class="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref="btnDropdownRef"
        v-on:click="toggleDropdown($event)"
      >
        <i class="fas fa-ellipsis-v"></i>
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
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Acciones
        </a>
        <a
          v-for="(item, index) in options"
          :key="index"
          href="javascript:void(0);"
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          @click="emit({ action: item.id, id: id })"
        >
          <i :class="item.icon"></i>
          {{ item.name }}
        </a>
      </div>
    </div>
  </template>
  <script>
  import { createPopper } from "@popperjs/core";
  
  export default {
    data() {
      return {
        dropdownPopoverShow: false,
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
      emit(action) {
        this.dropdownPopoverShow = false;
        this.$emit("emit", action);
      },
    },
    props: {
      options: {
        default: [],
      },
      id: {
        default: "",
      },
    },
  };
  </script>