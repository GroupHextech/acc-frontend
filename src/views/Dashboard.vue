<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">Dashboard</h1>
        <section class="hero is-small box">
          <SBbyStatus/>
        </section>
        <section class="hero is-small box">
          <ChassisByItem/>
        </section>
        <section class="hero is-small box">
          <IncorpItemsByChassi/>
        </section>
        <section class="hero is-small box">
          <ChassisContainsSB/>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SBbyStatus from '../components/charts/SBbyStatus.vue'
import ChassisByItem from '../components/charts/ChassisByItem.vue';
import IncorpItemsByChassi from '../components/charts/IncorpItemsByChassi.vue';
import ChassisContainsSB from '../components/charts/ChassisContainsSB.vue';
</script>

<style scoped>
.title {
  text-align: start;
}
.box {
  padding: 2rem;
  background-color: #eff1fa;
  border: 1px #dbdbdb solid;
  box-shadow: none;
}
</style>