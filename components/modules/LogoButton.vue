<template>
  <div class="logo">
    <nuxt-link
      to="/"
      title="Home"
    >
      <transition>
        <nuxt-img
          v-if="album === 'this-is-how-it-ends'"
          src="/static/logo/zigo-white.png"
          alt="ZIGO"
        />
        <svg-logo
          v-else
          :fill="fade ? '#ccc' : `#${ui}`"
        />
      </transition>
    </nuxt-link>
  </div>
</template>

<script>

import { mapState } from 'pinia'
import { useDiscoStore } from '@/stores/disco'

export default {
  computed: {
    ...mapState(useDiscoStore, [
      'album',
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
