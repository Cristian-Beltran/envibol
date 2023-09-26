<template>
  <div class="flex items-center">
    <div class="flex items-center ml-3">
      <span class="text-gray-800 dark:text-white mr-4">{{ profileStore.fullName }}</span>
      <Dropdown>
        <template v-slot:icon>
          <div>
            <button type="button" class="flex text-sm bg-gray-800 rounded-full">
              <span class="sr-only">Open user menu</span>
              <v-icon
                name="fa-user"
                class="w-8 h-8 rounded-full bg-gray-600 text-gray-200 p-1"
              />
            </button>
          </div>
        </template>
        <div
          class="z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul class="py-1" role="none">
            <li>
              <router-link
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                >Mi información</router-link
              >
            </li>
            <li>
              <router-link
                to="/updatePassword"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Actualizar contraseña
              </router-link>
            </li>
            <li>
              <span
                @click="logout"
                class="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                >Desconectarse</span
              >
            </li>
          </ul>
        </div>
      </Dropdown>
    </div>
  </div>
</template>

<script setup>
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import { useProfileStore } from "@/stores/profile";
const profileStore = useProfileStore();
async function logout() {
  await profileStore.logout();
  location.reload();
}
</script>
