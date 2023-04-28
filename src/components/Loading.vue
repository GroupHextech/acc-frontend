<template>
  <div class="loading">
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 20px;
}

.loading-dot {
  display: inline-block;
  margin-right: 10px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #485fc7;
  animation: loading 1s infinite ease-in-out;
}

.loading-dot:nth-child(1) {
  animation-delay: 0s;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.1s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes loading {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
