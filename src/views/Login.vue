<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">Login</h1>
        <section>
          <div class="columns is-gapless is-multiline is-desktop">
            <div class="column">
            </div>
            <div class="column is-half">
              <div class="box">

                <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input class="input" type="email" placeholder="Username" v-model="username">
                    <span class="icon is-small is-left">
                      <i class="pi pi-user"></i>
                    </span>
                    <span class="icon is-small is-right">
                      <i class="pi pi-check"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="password">
                    <span class="icon is-small is-left">
                      <i class="pi pi-lock"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                    <button type="submit" class="button is-link" @click.prevent="login">
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div class="column">
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

interface User {
  username: string;
  password: string;
}

export default defineComponent({
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");

    const router = useRouter();

    const users: User[] = [
      {
        username: "usuario1",
        password: "senha1",
      },
      {
        username: "usuario2",
        password: "senha2",
      },
    ];

    function login() {
      const validUser = users.find(
        (user) =>
          user.username === username.value && user.password === password.value
      );

      if (validUser) {
        // Redireciona o usuário para a página Chassis
        router.push({ name: "chassis" });

        // Redireciona o usuário para um chassi específico
        // router.push({ name: 'chassi-sb', params: { chassi: '10000076' }})
      } else {
        alert("Username or password is invalid");
      }
    }

    return {
      username,
      password,
      login,
    };
  },
});
</script>

<style scoped>
.box{
  padding: 0.5em;
  background-color: #f9f9f9;
  border: 1px #eee solid;
}
</style>
