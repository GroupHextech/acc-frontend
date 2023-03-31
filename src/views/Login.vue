<template>
    <div class="container">
        <h2 class="page-title">Login</h2>
        <form method="post">
            <div>
                <input type="text" name="username" id="username" placeholder="username" />
            </div>
            <div>
                <input type="password" name="password" id="password" placeholder="password" />
            </div>
            <div>
                <button type="button" class="btn btn-primary">
                    Login
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>