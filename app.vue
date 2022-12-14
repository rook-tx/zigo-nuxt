<template>
  <div
    :class="[
      'sec', 'player'
    ]"
  >
    <player-background
      :fade="obj.type === 'album' ? 0.8 : fade"
    />

    <app-page-nav />

    <div
      ref="content"
      class="content"
      @scroll.passive="handleScroll"
    >
      <nuxt-page
        :key="$route.fullPath"
      />
    </div>

    <player-play-controls />

    <player-audio-frame />
  </div>
</template>

<script>

import { mapState, mapActions } from 'pinia'
import { useDiscoStore } from '@/stores/disco'
import { useDeviceStore } from './stores/device'

export default {

  data() {
    return {
      fade: 0
    }
  },

  computed: {
    ...mapState(useDeviceStore, [
      'winHeight'
    ]),
    ...mapState(useDiscoStore, [
      'obj'
    ])
  },

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

    handleScroll(e) {
      const fade = e.target.scrollTop / (this.winHeight / 2)
      this.fade = Math.min(1, fade)
    }
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

