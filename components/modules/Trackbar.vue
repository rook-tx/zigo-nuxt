<template>
  <div class="trackbar">
    <div
      ref="progress"
      class="progress"
      :style="'background-color:' + ui"
    />
  </div>
</template>

<script>

import { mapState } from 'pinia'
import { useDiscoStore } from '@/stores/disco'
import { usePlayerStore } from '@/stores/player'

export default {

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
        const position = 1 - data
        this.$refs.progress.style.transform = `translate3d(-${position * 100}%,0,0)`
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
  left 0
  overflow hidden
  position absolute
  top -1px
  width 100%

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
