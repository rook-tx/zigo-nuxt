<template>
  <div :class="['sec', 'player']">
    <ui-sniffer />

    <player-background :fade="obj.type === 'album' ? 0.8 : fade" />

    <player-three-storm v-if="!mobile" />

    <modules-logo-button v-show="$route.name !== 'index'" />

    <app-page-nav />

    <div
      ref="content"
      :class="['content', $route.name]"
      @scroll.passive="handleScroll"
    >
      <nuxt-page />
    </div>

    <player-play-controls
      :type="$route.name === 'video' || $route.name === 'band' ? 'short' : ''"
    />

    <player-track-nav v-if="$route.name === 'album-track'" />

    <player-album-ui v-if="$route.name === 'album-track'" />

    <player-audio-frame />
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useDiscoStore } from '@/stores/disco'
import { useDeviceStore } from '@/stores/device'

export default {
  data() {
    return {
      fade: 0,
    }
  },

  computed: {
    ...mapState(useDeviceStore, ['mobile', 'winHeight']),
    ...mapState(useDiscoStore, ['obj']),
  },

  watch: {
    $route: {
      handler(route) {
        this.updateTrack(route.params)
        this.$refs.content.scrollTo({ top: 0, behavior: 'smooth' })
      },
    },

    fade: {
      handler(fade) {
        this.updateFade(fade === 1)
      },
    },
  },

  mounted() {
    this.updateTrack(this.$route.params)
  },

  methods: {
    ...mapActions(useDiscoStore, ['updateFade', 'updateTrack']),

    handleScroll(e) {
      const fade = e.target.scrollTop / (this.winHeight / 2)
      this.fade = Math.min(1, fade)
    },
  },
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

  &.index {
    mix-blend-mode overlay
  }
}

.page,
.page-enter-active,
.page-leave-active {
  transition: opacity .9s;
}
</style>
