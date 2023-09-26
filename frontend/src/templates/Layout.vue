<template>
  <main>
    <Navbar />
    <Sidebar />

    <div class="p-4 sm:ml-64">
      <div
        class="p-4 rounded-lg  mt-14"
      >
       <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Navbar from "@/components/navbar/Navbar.vue";
</script>
