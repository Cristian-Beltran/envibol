<template>
  <div>
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-gray-200 dark:bg-gray-800 bg-center bg-no-repeat bg-gray-700 bg-blend-multiply"
          v-bind:style="{
            'background-image': 'url(' + bg + ')',
            'background-color': '#02528a',
          }"
        ></div>
        <router-view />
      </section>
    </main>
  </div>
</template>
<script setup>
import bg from "@/assets/bg.jpg";
</script>
