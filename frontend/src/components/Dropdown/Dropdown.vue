<template>
  <Popper v-bind="$attrs" hover openDelay="200" closeDelay="100">
    <slot name="icon"></slot>
    <template #content="{ close }">
      <slot @click="close"></slot>
    </template>
  </Popper>
</template>

<script setup>
import Popper from "vue3-popper";
</script>
