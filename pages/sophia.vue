<script setup lang="ts">
import Princess from '@/components/modules/Princess.vue'
definePageMeta({
  layout: 'custom',
  title: 'Sophia',
})
</script>

<template>
  <div class="sophia-page">
    <!-- <transition>
      <modules-logo-button />
    </transition> -->

    <!-- <app-page-nav /> -->
    <Princess />
  </div>
</template>

<style lang="stylus">
@import "../assets/styl/_variables"

.sophia-page
  canvas
    position absolute
    top 0
    left 0
    width 100%
    height 100%

</style>
