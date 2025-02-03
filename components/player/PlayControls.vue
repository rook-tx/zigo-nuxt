<template>
  <div :class="['play-controls', type]">
    <modules-trackbar />

    <modules-player-button
      :title="playing ? 'Pause' : 'Play'"
      @click="playpause()"
    />

    <modules-player-button type="next" title="Next track" @click="next(idx)" />

    <modules-player-button
      type="prev"
      title="Previous track"
      @click="prev(idx)"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { usePlayerStore } from '@/stores/player'
import { useDiscoStore } from '@/stores/disco'

export default {
  props: {
    type: {
      type: String,
      default: '',
    },
  },

  computed: {
    ...mapState(usePlayerStore, ['playing']),
    ...mapState(useDiscoStore, ['idx']),
  },

  mounted() {
    window.addEventListener('keyup', this.keyup, { passive: true })
  },

  beforeUnmount() {
    window.removeEventListener('keyup', this.keyup, { passive: true })
  },

  methods: {
    ...mapActions(usePlayerStore, ['playpause']),
    ...mapActions(useDiscoStore, ['next', 'prev']),

    keyup(e) {
      if (e.keyCode === 32) {
        this.playpause()
      } else if (e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 9) {
        this.next()
      } else if (
        e.keyCode === 37 ||
        e.keyCode === 38 ||
        e.keyCode === 8 ||
        e.keyCode === 46
      ) {
        this.prev()
      }
    },
  },
}
</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.play-controls {
  background rgba(0,0,0,.001)
  backdrop-filter blur(1px)
  bottom 0
  height 10%
  left 0
  max-width 100%
  position absolute
  right 0
  transition max-width 1s $easeInOutCubic
  transition-property max-width, background-image
  z-index 5

  &.short {
    +above($mobile) {
      max-width 11.6*3vh
    }
  }
}
</style>
