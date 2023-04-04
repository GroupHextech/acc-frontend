<!-- <template>
    <div class="container">
        <h2 class="page-title">Login</h2>
        <div class="row justify-content-center">
            <div class="col-8 col-md-6 col-lg-5 card">
                <form class="login-form">
                    <div class="form-group">
                        <-- username ->
                        <input type="email" class="form-control" id="inputUsername" aria-describedby="usernameHelp"
                            placeholder="username">
                    </div>
                    <div class="form-group">
                        <-- password ->
                        <input type="password" class="form-control" id="inputPassword" placeholder="password">
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="checkLabel">Remember me</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
    padding-bottom: 1.5rem;
}

.card {
    border: 1px solid lightgray;
    border-radius: 5px;
    background: #e9ecef;
    min-width: fit-content;
}
.page-title {
    text-align: center;
}

.login-form {
    text-align: left;
    padding: 1rem 0 1rem 0;
}

.form-check {
    text-align: center;
}

.btn,
.btn-primary {
    min-width: 100%;
    background-color: rgb(10, 26, 92);
    border: rgb(10, 26, 92);
}</style> -->

<template>
    <div class="container">
        <h2 class="page-title text-center">Login</h2>
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-8 col-sm-10">
                <div class="card shadow">
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label for="username" class="visually-hidden">Username</label>
                                <input type="text" class="form-control form-control-lg" id="username" v-model="username"
                                    placeholder="username">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="visually-hidden">Password</label>
                                <input type="password" class="form-control form-control-lg" id="password" v-model="password"
                                    placeholder="password">
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg w-100" @click.prevent="login">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

interface User {
    username: string
    password: string
}

export default defineComponent({
    name: 'Login',
    setup() {
        const username = ref('')
        const password = ref('')

        const router = useRouter()

        const users: User[] = [
            {
                username: 'usuario1',
                password: 'senha1',
            },
            {
                username: 'usuario2',
                password: 'senha2',
            },
        ]

        function login() {
            const validUser = users.find(user => user.username === username.value && user.password === password.value)

            if (validUser) {
                // Redireciona o usuário para a página de Veículo
                router.push({ name: 'vehicle' })
            } else {
                alert('Username or password is invalid')
            }
        }

        return {
            username,
            password,
            login,
        }
    },
})
</script>
  
<style>
.card {
    margin-top: 50px;
    background: #e9ecef;
}

label.visually-hidden {
    display: block;
    height: 0;
    width: 0;
    overflow: hidden;
    position: absolute;
}

input[type="username"]::before,
input[type="password"]::before {
    content: attr(label);
    display: block;
    margin-bottom: .5rem;
    color: #999;
}

.btn-primary {
    background-color: rgb(10, 26, 92);
    border-color: rgb(10, 26, 92);
}

.btn-primary:hover {
    background-color: rgb(23, 53, 119);
    border-color: rgb(23, 53, 119);
}
</style>