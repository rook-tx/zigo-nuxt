<template>
  <div
    :class="[
      'sec', 'player'
    ]"
  >
    <player-background />

    <app-page-nav />

    <div class="content">
      <nuxt-page />
    </div>

    <player-audio-frame />
  </div>
</template>

<script>

import { mapActions } from 'pinia'
import { useDiscoStore } from '@/stores/disco'

export default {
  watch: {
    $route: {
      handler(route) {
        this.updateTrack(route.params)
      }
    }
  },

  mounted() {
    this.updateTrack(this.$route.params)
  },

  methods: {
    ...mapActions(useDiscoStore, [
      'updateTrack'
    ]),
  }
}

</script>

<style lang="stylus">

@import "./assets/styl/_variables"

.content {
  height 100%
  position relative
  overflow-y auto
  overflow-x hidden
  z-index 1

  +below($tablet) {
    -webkit-overflow-scrolling touch
    overflow-y scroll
    overflow-x hidden
  }
}

</style>

