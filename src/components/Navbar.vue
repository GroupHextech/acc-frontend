<template>
  <div>
    <nav
      class="navbar is-link is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img
            alt="logo"
            src="../assets/sedan-car-side-black-silhouette.svg"
            width="70"
            height="28"
          />
          EMBRACAR
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          v-if="isLoggedIn"
          @click="toggleMenuActive"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': isMenuActive }"
        v-if="isLoggedIn"
      >
        <div class="navbar-start">
          <router-link
            class="navbar-item"
            to="/dashboard"
            @click="handleMenuButtonClick"
            v-if="hasPermission('restrict')"
            >Dashboard</router-link
          >
          <div
            class="navbar-item has-dropdown"
            v-bind:class="{ 'is-hoverable': hasPermission('restrict') }"
          >
            <router-link
              class="navbar-link"
              to="/chassis"
              @click="handleMenuButtonClick"
              >Chassis</router-link
            >
            <div class="navbar-dropdown">
              <router-link
                class="navbar-item"
                to="/chassis/register"
                @click="handleMenuButtonClick"
                >Add chassis</router-link
              >
              <router-link
                class="navbar-item"
                to="/users"
                @click="handleMenuButtonClick"
                >Link chassis to Users</router-link
              >
            </div>
          </div>
          <router-link
            class="navbar-item"
            to="/items"
            @click="handleMenuButtonClick"
            >Items</router-link
          >
          <!--<a class="navbar-item" @click="handleMenuButtonClick"
            >Service Bulletins</a
          >-->
        </div>

        <div class="navbar-end" v-bind:class="{ 'is-centered': isMenuActive }">
          <div class="navbar-item is-flex">
            <div class="buttons">
              <a class="button is-link is-light is-small" @click="logout">
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

export default defineComponent({
  name: "Navbar",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();
    const isMenuActive = ref(false);

    function hasPermission(permission: "allowed" | "restrict"): boolean {
      const authorization = sessionStorage.getItem("authorization");
      return authStore.hasPermission(permission, authorization);
    }

    const isLoggedIn = computed(() => {
      // Verifica se o usuário está na rota de login
      if (route.name === "login") {
        return false;
      }
      // Verificação se o usuário está logado
      return true;
    });

    watch(isLoggedIn, () => {
      // Fechar o menu quando o usuário fizer login
      isMenuActive.value = false;
    });

    function toggleMenuActive() {
      isMenuActive.value = !isMenuActive.value;
    }

    function handleMenuButtonClick() {
      isMenuActive.value = false;
    }

    async function logout() {
      await authStore.logout();
      await router.push({ name: "login" });
    }

    return {
      isLoggedIn,
      isMenuActive,
      toggleMenuActive,
      hasPermission,
      handleMenuButtonClick,
      logout,
    };
  },
});
</script>

<style scoped>
.navbar-end.is-centered .is-flex {
  justify-content: center;
}
</style>
