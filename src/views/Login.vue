<template>
    <div class="container">
        <h2 class="page-title">Login</h2>
        <div class="card">
            <form class="login-form">
                <div class="form-group">
                    <!-- username -->
                    <input type="email" class="form-control" id="inputUsername" aria-describedby="usernameHelp"
                        placeholder="username">
                </div>
                <div class="form-group">
                    <!-- password -->
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
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
    padding-bottom: 1.5rem;
}
.page-title {
    text-align: center;
}
.login-form {
    text-align: left;
    padding: 1rem;
}
.form-check {
    text-align: center;
}
.btn, .btn-primary {
    min-width: 100%;
    background-color: rgb(10, 26, 92);
    border: rgb(10, 26, 92);
}
</style>