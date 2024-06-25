<template>
  <div v-if="isLoaded" class="customer-app flex h-full flex-col">
    <div class="mx-auto h-full flex w-full items-start">
      <SidebarComponent></SidebarComponent>
      <article class="flex-1 h-full mx-4">
        <router-view />
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import "floating-vue/dist/style.css";
import "vue-toastification/dist/index.css";
import "./style.css";
import SidebarComponent from "./components/SidebarComponent.vue";
import { ref } from "vue";

const isLoaded = ref(false);

if (
  localStorage.getItem("@me:shared_me_state") != null &&
  localStorage.getItem("token") != null
)
  isLoaded.value = true;
</script>
