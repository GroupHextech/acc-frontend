<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">Login</h1>
        <section>
          <div class="columns is-centered">
            <div class="column is-half is-offset-one-quarter">
              <div class="box">
                <div class="field">
                  <p class="control has-icons-left">
                    <input
                      class="input"
                      type="email"
                      placeholder="Username"
                      v-model="username"
                    />
                    <span class="icon is-small is-left">
                      <i class="pi pi-user"></i>
                    </span>
                  </p>
                </div>
                <div class="field has-addons">
                  <p class="control has-icons-left is-expanded">
                    <input
                      id="password"
                      class="input"
                      type="password"
                      placeholder="Password"
                      v-model="password"
                    />
                    <span class="icon is-small is-left">
                      <i class="pi pi-lock"></i>
                    </span>
                  </p>
                  <div class="control">
                    <a id="eyeButton" class="button">
                      <i id="eye" class="pi pi-eye" @click="showPassword"></i>
                    </a>
                  </div>
                </div>
                <div class="field">
                  <p class="control">
                    <button
                      type="submit"
                      class="button is-link"
                      @click.prevent="login"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
              <LoginFailed v-if="loginFailed" @close="loginFailed = false" />
            </div>
            <div class="column"></div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import LoginFailed from "../components/LoginFailed.vue";

export default defineComponent({
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const authStore = useAuthStore();
    const loginFailed = ref(false);

    async function login() {
      if (await authStore.login(username.value, password.value)) {
        // autenticação bem-sucedida, faça algo aqui
        await router.push({ name: "chassis" });
      } else {
        // autenticação falhou, exiba LoginFailed
        loginFailed.value = true;
      }
    }
    return {
      username,
      password,
      loginFailed,
      login,
    };
  },
  methods: {
    showPassword() {
      var typePassword: HTMLInputElement = document.getElementById(
        "password"
      ) as HTMLInputElement;
      var typeIcon: HTMLInputElement = document.getElementById(
        "eye"
      ) as HTMLInputElement;
      if (typePassword.type == "password") {
        typePassword.type = "text";
        typeIcon.className = "pi pi-eye-slash";
      } else {
        typePassword.type = "password";
        typeIcon.className = "pi pi-eye";
      }
    },
  },
  components: { LoginFailed },
});
</script>

<style scoped>
.box {
  padding: 2rem;
  background-color: #eff1fa;
  border: 1px #dbdbdb solid;
  box-shadow: none;
}
#eye {
  color: #dbdbdb;
}
</style>
