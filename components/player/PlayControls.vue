<template>
  <div :class="[ 'play-controls', type ]">
    <modules-trackbar />

    <modules-player-button
      @click="playpause()"
    />

    <modules-player-button
      type="next"
      @click="next(idx)"
    />

    <modules-player-button
      type="prev"
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
      default: ''
    }
  },

  computed: {
    ...mapState(usePlayerStore, [
      'playing'
    ]),
    ...mapState(useDiscoStore, [
      'idx'
    ])
  },

  mounted() {
    window.addEventListener('keyup', this.keyup, { passive: true })
  },

  beforeUnmount() {
    window.removeEventListener('keyup', this.keyup, { passive: true })
  },

  methods: {
    ...mapActions(usePlayerStore, [
      'playpause',
    ]),
    ...mapActions(useDiscoStore, [
      'next',
      'prev'
    ]),

    keyup(e) {
      if (e.keyCode === 32) {
        this.playpause()
      } else if (e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 9) {
        this.next()
      } else if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 8 || e.keyCode === 46) {
        this.prev()
      }
    },
  }
}

</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.play-controls {
	bottom 10%
	left $gut*1em
	max-width 100%
	position absolute
	right $gut*1em
	transition max-width 1s $easeInOutCubic
	z-index 5

	+above($mobile) {
		left 5.8vh
		right 5.8vh
	}

  &.short {
    +above($mobile) {
      max-width 11.6*2vh
    }
  }
}

</style>
