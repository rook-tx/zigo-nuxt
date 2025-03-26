<script setup lang="ts">
import { useDiscoStore } from '@/stores/disco'

const discoStore = useDiscoStore()

const pos = ref({
  x: 0,
  y: 0,
})

const moving = ref(false)
const tracking = ref(false)

let timeout: number

function updatePos(e: MouseEvent) {
  clearTimeout(timeout)
  if (!tracking.value) return
  moving.value = true
  pos.value = {
    x: e.clientX,
    y: e.clientY,
  }
  timeout = setTimeout(() => {
    moving.value = false
  }, 600)
}

function visibilityChange() {
  if (document.hidden) {
    moving.value = false
    tracking.value = false
  } else {
    tracking.value = true
  }
}

onMounted(() => {
  window.addEventListener('mousemove', updatePos, { passive: true })
  document.addEventListener('visibilitychange', visibilityChange)
  visibilityChange()
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', updatePos)
  document.removeEventListener('visibilitychange', visibilityChange)
})
</script>

<template>
  <div
    :class="['headless', { 'headless--moving': moving }]"
    :style="{
      transform: `translateX(${pos.x}px) translateY(${pos.y}px) rotate(${moving ? 0 : -20}deg)`,
    }"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="240"
      height="240"
      fill="none"
      viewBox="0 0 240 240"
      class="headless-icon"
    >
      <path
        :fill="discoStore.fade ? '#ccc' : `#${discoStore.ui}`"
        d="M94.36 57.47c-6.61-.15-7.37 1.92-10.53 5.3a1894.14 1894.14 0 0 1-26.06 31.4c-1.15 1.39-1.8 1.97-4.54 1.95-9.05.16-19.89.33-30.32.24a9.9 9.9 0 0 0-9.91 9.92c0 5.49 4.42 9.9 9.91 9.9l38.1-.04c2.8-.05 3.85-.79 6.85-3.78l18.17-21.48c5.04 11.02 9.79 20.39 14.8 31.03.57 1.1 1.91 3.54.9 5.44L51.8 228.2l18.33-.06c9.57.21 13.57-6.4 16.93-12.32 13.52-27.23 27.09-54.44 40.62-81.67l2.55 48.46c.67 8.38 6.34 10.52 13.77 10.75l83.9.18c0-9.64-9.55-22.37-25.11-22.98 0 0-29.98.34-45.64.4-1.99 0-2.53-1.11-2.76-2.76-.73-12.47-1.42-25.02-2.2-37.48-.48-6.2-1.02-10.48-2.82-15.16C143.5 103 137.65 90.52 131.8 78l21.44-.25c.56-.02 1 .1 1.3.6l15.51 27.2c6.4 11.67 23.7 3.16 17.9-9.23L168.93 64.5c-3.35-4.98-4.88-6.7-13.58-6.96 0 0-40.63-.07-60.98-.07Z"
      />
      <path
        stroke-width="5"
        :stroke="discoStore.fade ? '#ccc' : `#${discoStore.ui}`"
        d="M73.29 31.66C73.29 21.05 81.33 13 91.87 13s18.6 8.05 18.6 18.66c0 10.64-8.06 18.69-18.6 18.69-10.54 0-18.58-8.05-18.58-18.69Z"
      />
    </svg>
  </div>
</template>

<style lang="stylus">
@import '../../assets/styl/_variables'

.headless
  left 0
  top 0
  position fixed
  width 2rem
  opacity 0
  transition opacity .3s, transform .5s $easeOutCubic
  z-index 6
  pointer-events none

  &-icon
    transform translateX(-35%) translateY(-10%)

  &-head
    opacity .3

  &--moving
    opacity 1
</style>
