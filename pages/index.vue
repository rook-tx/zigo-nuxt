
import { NuxtLink } from '~~/.nuxt/components';

<template>
  <main class="home">
    <div class="logo-wrap">
      <NuxtLink to="/music">
        <svg-logo />
      </NuxtLink>
    </div>
  </main>
</template>

<style lang="stylus">

@import "../assets/styl/_variables"

.home {
  display flex
  height 100%

  .logo-wrap {
    fill $b
    margin auto

    &:hover {
      fill $w
    }
  }

  svg {
    fill inherit
    height 10vh
    width auto
    transition fill .6s
  }
}

</style>
