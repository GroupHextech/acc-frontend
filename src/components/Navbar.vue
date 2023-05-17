<template>
  <div>
    <nav class="navbar is-link is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img alt="logo" src="../assets/sedan-car-side-black-silhouette.svg" width="70" height="28" />
          EMBRACAR
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
          v-if="isLoggedIn">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" v-if="isLoggedIn">

        <div class="navbar-start">
          <a class="navbar-item"> Home </a>
          <router-link class="navbar-item" to="/dashboard">Dashboard</router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link class="navbar-link" to="/chassis">Chassis</router-link>
            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/chassis/register">Add chassis</router-link>
            </div>
          </div>
          <router-link class="navbar-item" to="/items">Items</router-link>
          <a class="navbar-item">Service Bulletins</a>
        </div>

        <div class="navbar-end" v-bind:class="{ 'is-centered': isMenuActive }">
          <div class="navbar-item is-flex">
            <div class="buttons">
              <a class="button is-link is-light is-small" @click="logout"> Sign out </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

export default defineComponent({
  name: "Navbar",
  mounted() {
    $(document).ready(() => {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(() => {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    // Add click event listener to menu links
    $(".navbar-menu a").click(() => {
      // Remove "is-active" class from burger and menu
      $(".navbar-burger").removeClass("is-active");
      $(".navbar-menu").removeClass("is-active");
    });
  });
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();

    const isLoggedIn = computed(() => {
      // Verifica se o usuário está na rota de login
      if (route.name === "login") {
        return false;
      }
      // Verificação se o usuário está logado
      return true;
    });

    const isMenuActive = computed(() => {
      const navbarBurger = document.querySelector('.navbar-burger');
      return navbarBurger && navbarBurger.classList.contains('is-active');
    });

    async function logout() {
      await authStore.logout();
      await router.push({ name: "login" });
    }

    return {
      isLoggedIn,
      isMenuActive,
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
