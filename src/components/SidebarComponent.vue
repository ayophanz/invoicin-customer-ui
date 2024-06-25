<template>
  <aside
    :class="compMenuHideToggle ? 'w-44 px-2 border-r' : 'w-0 p-0 border-r-0'"
    class="transition-all duration-700 py-1 h-full shrink-0 border-gray-200 overflow-hidden"
  >
    <div class="flex justify-end mb-2">
      <a
        href="javascript:;"
        @click="menuHide()"
        :class="compMenuHideToggle ? 'rotate-0' : 'rotate-180'"
        class="text-white bg-gray-700 transition-all duration-700 absolute rounded-full left-[-16px] p-1"
      >
        <ArrowLeftIcon class="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
    <ul
      role="list"
      class="divide-y divide-gray-100 pt-5 transition-all duration-700"
      :class="compMenuHideToggle ? 'opactiy-100' : 'opacity-0'"
    >
      <li
        v-for="(menu, key) in compMenus"
        :key="key"
        class="relative flex justify-between gap-x-1 py-2 transition-all duration-700"
      >
        <div class="flex w-full gap-x-4">
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">
              <a
                @click="submenuHide(key)"
                href="javascript:;"
                class="w-full block"
              >
                {{ menu.name }}
              </a>
            </p>
            <ul
              :class="menu.active == true ? 'flex' : 'hidden'"
              class="px-2 flex flex-col mt-2 gap-y-1 overflow-hidden transition-all duration-700"
            >
              <li v-for="(submenu, key2) in menu.submenu" :key="key2">
                <RouterLink
                  :to="submenu.to"
                  :class="[
                    currentPath(submenu.to) ? 'bg-gray-700 text-white' : '',
                    'w-full flex justify-between items-center text-sm hover:bg-gray-700 rounded-full py-1 px-2 transition-all hover:text-white',
                  ]"
                >
                  <span>{{ submenu.name }}</span>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex shrink-0 items-start">
          <div class="hidden sm:flex sm:flex-col sm:items-end"></div>
          <a
            href="javascript:;"
            @click="submenuHide(key)"
            :class="menu.active == true ? 'rotate-180' : 'rotate-0'"
            class="transition-all duration-700"
          >
            <ChevronDownIcon
              class="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </a>
        </div>
      </li>
    </ul>
  </aside>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { ChevronDownIcon, ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";
// import { useOrganizationStore } from "../stores/organization";
// import { storeToRefs } from "pinia";

// const organizationStore = useOrganizationStore();
// const { getCurrentRole } = storeToRefs(organizationStore);

const route = useRoute();

const menuHideToggle = ref(true);
const menus = ref([
  {
    name: "General",
    active: true,
    submenu: [
      {
        name: "Profile",
        to: "/organization/profile",
      },
      {
        name: "Addresses",
        to: "/organization/address",
      },
      {
        name: "Settings",
        to: "/organization/settings",
      },
    ],
  },
  {
    name: "Users",
    active: false,
    submenu: [
      {
        name: "All",
        to: "/organization/users",
      },
      {
        name: "Verified",
        to: "/organization/users/verified",
      },
      {
        name: "Pending",
        to: "/organization/users/pending",
      },
    ],
  },
]);

onMounted(() => {
  currentMenu();
  // if (getCurrentRole.value == "member") {
  //   const key = menus.value.findIndex(
  //     (x: { name: string }) => x.name === "Users"
  //   );
  //   menus.value.splice(key, 1);
  // }
});

watch(route, () => {
  currentMenu();
});

const currentMenu = () => {
  const path = window.location.pathname.split("/");
  if (path && path[2] && path[2] == "users") {
    mapMenu("Users");
  } else {
    mapMenu("General");
  }
};

const mapMenu = (name: string) => {
  menus.value.forEach((_item, key) => {
    menus.value[key].active = false;
  });

  const key = menus.value.findIndex((x: { name: string }) => x.name === name);
  menus.value[key].active = true;
};

const menuHide = () => {
  menuHideToggle.value = !menuHideToggle.value;
};

const submenuHide = (key: number) => {
  menus.value[key].active = !menus.value[key].active;
};

const compMenuHideToggle = computed(() => menuHideToggle.value);

const compMenus = computed(() => menus.value);

const currentPath = (to: string) => {
  // if (to.split("?").length > 0) {
  //   const urlParams = new URLSearchParams(to.split("?")[1]);
  //   const entries = urlParams.entries() as any;

  //   for (const entry of entries) {
  //     const find = Object.keys(route.query).find(
  //       (key) => key === entry[0] && route.query[key] === entry[1]
  //     );
  //     if (find) return true;
  //   }
  // }
  return route.path == to;
};
</script>
