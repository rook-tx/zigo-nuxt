<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { useDiscoStore } from '@/stores/disco'

const discoStore = useDiscoStore()
const playerStore = usePlayerStore()

defineProps({
  type: {
    type: String,
    default: '',
  },
})

function keyup(e: KeyboardEvent) {
  if (e.code === 'Space') {
    playerStore.playpause()
  } else if (
    e.code === 'ArrowRight' ||
    e.code === 'ArrowDown'
  ) {
    discoStore.next()
  } else if (
    e.code === 'ArrowLeft' ||
    e.code === 'ArrowUp'
  ) {
    discoStore.prev()
  }
}

onMounted(() => {
  window.addEventListener('keyup', keyup, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('keyup', keyup)
})
</script>

<template>
  <div :class="['play-controls', type]">
    <modules-trackbar />

    <modules-player-button
      :title="playerStore.playing ? 'Pause' : 'Play'"
      @click="playerStore.playpause()"
    />

    <modules-player-button
      type="next"
      title="Next track"
      @click="discoStore.next(discoStore.idx)"
    />

    <modules-player-button
      type="prev"
      title="Previous track"
      @click="discoStore.prev(discoStore.idx)"
    />
  </div>
</template>

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
