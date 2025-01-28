<template>
  <div class="logo">
    <nuxt-link
      to="/"
      title="HOME"
    >
      <svg-logo
        :fill="fade ? '#ccc' : `#${ui}`"
      />
    </nuxt-link>
  </div>
</template>

<script>

import { mapState } from 'pinia'
import { useDiscoStore } from '@/stores/disco'

export default {
  computed: {
    ...mapState(useDiscoStore, [
      'ui',
      'fade'
    ])
  },
}

</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.logo {
  height 10%
  left 0
  padding-left 5.8vh
  position absolute
  top 0
  z-index 5

  a {
    align-items center
    display flex
    height 100%
    justify-content center
    width 11.55vh
  }

  svg {
    display block
    height auto
    transition fill .3s
    width 100%
  }

  +below($mobile) {
    padding-left 5.77*.5vh
  }
}

</style>
