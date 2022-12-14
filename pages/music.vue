<script setup>
useHead({
  title: 'Music'
})
</script>

<template>
  <section class="music page">
    <div class="nav-wrap">
      <transition>
        <modules-square-nav />
      </transition>
    </div>
  </section>
</template>

<script>

export default {
}

</script>

<style lang="stylus">

@import "../assets/styl/_variables"

.music.page {
	+above($tablet) {
		height 100%
	}

  .nav-wrap {
    left 0
    position relative
    top 10%
    width 100%

    +above($mobile) {
      height 80%
    }
  }
}

</style>
