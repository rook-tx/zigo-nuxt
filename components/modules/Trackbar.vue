<template>
  <div class="trackbar">
    <div
      ref="progress"
      class="progress"
      :style="{
        backgroundColor: `#${ui}`,
        transform: `translate3d(${trackPosition * -100}%,0,0)`
      }"
    />
  </div>
</template>

<script>

import { mapState } from 'pinia'
import { useDiscoStore } from '@/stores/disco'
import { usePlayerStore } from '@/stores/player'

export default {

  data() {
    return {
      trackPosition: 0
    }
  },

  computed: {
    ...mapState(usePlayerStore, [
      'playing',
      'position'
    ]),
    ...mapState(useDiscoStore, [
      'ui'
    ])
  },

  watch: {
    position: {
      handler(position) {
        this.playreport(position)
      }
    }
  },

  methods: {
    playreport(data) {
      if (data) {
        this.trackPosition = 1 - data
      }
    }
  }
}

</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.trackbar {
  background rgba($b,.1)
  height 1px
  left $gut * 1em
  right $gut * 1em
  overflow hidden
  position absolute
  top -1px

  .progress {
    background $b
    height 100%
    left 0
    position absolute
    transform translate3d(-100%,0,0)
    top 0
    width 100%
  }
}

</style>
