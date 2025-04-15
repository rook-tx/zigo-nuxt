<script setup>
useHead({
  title: 'Music', 
})
</script>

<template>
  <section class="music page">
    <div class="nav-wrap">
      <modules-square-nav />
    </div>
  </section>
</template>

<style lang="stylus">

@import "../assets/styl/_variables"

.music.page {
	+above($mobile) {
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
