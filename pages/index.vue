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

    @media (hover:hover) {
      &:hover {
        fill $w
      }
    }
  }

  svg {
    fill inherit
    height 10vh
    width auto
    transition fill .6s
  }

  &.page-enter-from,
  &.page-leave-to {
    opacity 0
  }

  &.page-enter-to,
  &.page-leave-from {
    opacity 1
  }
}

</style>
