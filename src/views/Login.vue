<template>
    <div class="container">
        <h2 class="page-title">Login</h2>
        <div class="row justify-content-center">
            <div class="col-8 col-md-6 col-lg-5 card">
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
}</style>