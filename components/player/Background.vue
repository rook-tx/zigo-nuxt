<script setup lang="ts">
import { useDeviceStore } from '@/stores/device'
import { useDiscoStore } from '@/stores/disco'

const deviceStore = useDeviceStore()
const discoStore = useDiscoStore()
const route = useRoute()

const position = ref(50)
const opacity = ref(0)

const img = useImage()
const options = computed(() => (deviceStore.portrait || discoStore.album === 'this-is-how-it-ends') ? {
  height: deviceStore.winHeight,
} : {
  width: deviceStore.winWidth,
})
const image = computed(() =>
  img(discoStore.obj.src || '/static/tracks/naam-bg.jpg', {
    ...options.value,
    quality: 80,
    format: 'webp',
  }),
)
const stroke = computed(() => `#${discoStore.ui || 'fff'}`)
const color = computed(() => `#${discoStore.obj.bgColor || '000'}`)
const size = computed(() => discoStore.obj.bgType || 'cover')

const props = defineProps({
  fade: {
    type: Number,
    default: 0,
  },
})

watch(
  () => discoStore.idx,
  (idx) => {
    if (idx < 12 && route.name === 'album-track') {
      position.value = (idx / 12) * 100
    } else {
      position.value = 50
    }
  },
  { immediate: true },
)

watch(
  () => props.fade,
  (fade) => {
    opacity.value = fade
  },
  { immediate: true },
)
</script>

<template>
  <div class="background-cover">
    <transition>
      <div :key="image" class="outer">
        <div
          ref="inner"
          class="inner"
          :style="{
            backgroundImage: `url(${image})`,
            backgroundColor: color,
            backgroundPosition: `${position}% center`,
            backgroundSize: size,
          }"
        />
      </div>
    </transition>

    <transition>
      <div
        v-if="route.name === 'album-track' &&
          discoStore.album === 'the-fox'"
        :key="discoStore.track"
        class="circle"
      >
        <nuxt-img
          class="circle-inner"
          :src="`/static/tracks/the-fox/${discoStore.track}-circle.jpg`"
          width="100%"
          height="100%"
        />
      </div>
    </transition>

    <div
      class="shade"
      :style="{
        opacity: opacity,
      }"
    />

    <div class="gradient" />

    <div ref="over" class="over">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2391 900"
        :height="deviceStore.winHeight"
        :width="deviceStore.winHeight * (2391 / 900)"
        :style="{
          stroke: stroke,
          'stroke-width': (route.name === 'album-track' &&
            discoStore.album === 'the-fox') ? 2 : 1
        }"
      >
        <path d="M1143.14-.08l519.72 900.16" />
        <path d="M1039.14-.08l519.72 900.16" />
        <path d="M935.14-.08l519.72 900.16" />
        <path d="M831.14-.08l519.72 900.16" />
        <path d="M727.14-.08l519.72 900.16" />
        <path d="M623.14-.08l519.72 900.16" />
        <path d="M519.14-.08l519.72 900.16" />
        <path d="M415.14-.08l519.72 900.16" />
        <path d="M311.14-.08l519.72 900.16" />
        <path d="M207.14-.08l519.72 900.16" />
        <path d="M103.14-.08l519.72 900.16" />
        <path d="M-.86-.08l519.72 900.16" />
        <path d="M-1 179l415.86 721.08" />
        <path d="M0 362l310.86 538.08" />
        <path d="M0 542l206.86 358.08" />
        <path d="M-1 721l103.86 179.08" />
        <path d="M1247.14-.08l519.72 900.16" />
        <path d="M1351.14-.08l519.72 900.16" />
        <path d="M1455.14-.08l519.72 900.16" />
        <path d="M1559.14-.08l519.72 900.16" />
        <path d="M1663.14-.08l519.72 900.16" />
        <path d="M1767.14-.08l519.72 900.16" />
        <path d="M1871.14-.08l519.72 900.16" />
        <path d="M1975.14-.08L2391 720" />
        <path d="M2079.14-.08L2391 540" />
        <path d="M2183.14-.08L2391 360" />
        <path d="M2287.14-.08L2394 184" />
        <path d="M1143.14 900.08L1662.86-.08" />
        <path d="M1039.14 900.08L1558.86-.08" />
        <path d="M935.14 900.08L1454.86-.08" />
        <path d="M831.14 900.08L1350.86-.08" />
        <path d="M727.14 900.08L1246.86-.08" />
        <path d="M623.14 900.08L1142.86-.08" />
        <path d="M519.14 900.08L1038.86-.08" />
        <path d="M415.14 900.08L934.86-.08" />
        <path d="M311.14 900.08L830.86-.08" />
        <path d="M207.14 900.08L726.86-.08" />
        <path d="M103.14 900.08L622.86-.08" />
        <path d="M-.86 900.08L518.86-.08" />
        <path d="M-1 721L414.86-.08" />
        <path d="M0 538L310.86-.08" />
        <path d="M0 358L206.86-.08" />
        <path d="M-1 179L102.86-.08" />
        <path d="M1247.14 900.08L1766.86-.08" />
        <path d="M1351.14 900.08L1870.86-.08" />
        <path d="M1455.14 900.08L1974.86-.08" />
        <path d="M1559.14 900.08L2078.86-.08" />
        <path d="M1663.14 900.08L2182.86-.08" />
        <path d="M1767.14 900.08L2286.86-.08" />
        <path d="M1871.14 900.08L2390.86-.08" />
        <path d="M1975.14 900.08L2391 180" />
        <path d="M2079.14 900.08L2391 360" />
        <path d="M2183.14 900.08L2391 540" />
        <path d="M2287.14 900.08L2394 716" />
        <path d="M0 89h2391" />
        <path d="M0 179h2391" />
        <path d="M0 269h2391" />
        <path d="M0 359h2391" />
        <path d="M0 449h2391" />
        <path d="M0 539h2391" />
        <path d="M0 629h2391" />
        <path d="M0 719h2391" />
        <path d="M0 809h2391" />
      </svg>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../../assets/styl/_variables"

.background-cover
  &, .outer, .inner, .upper, .over, .shade, .gradient
    abs()
    transform translate3d(0,0,0)

  position fixed
  z-index 0

  .gradient
    background linear-gradient(180deg, rgba($b,.12), rgba($b,0) 15%, rgba($b,0) 75%, rgba($b,.12))

  .outer
    opacity 1
    transition opacity 1s

    &.v-enter-from, &.v-leave-to
      opacity 0

  .inner, .upper
    background #fff no-repeat center
    background-size cover
    transition transform 3s $easeOutCubic

  .inner
    transition-property transform, background
    transition-duration 3s, 1s

  .circle
    border-radius 40vh
    margin 10vh auto
    height 80vh
    width 80vh
    overflow hidden
    position relative

    &-inner
      height 100%
      width 100%

  .over
    opacity .4
    overflow hidden

    @supports (mix-blend-mode difference)
      mix-blend-mode overlay

    svg
      display block
      max-width none
      height 100vh
      left 50%
      position absolute
      top 0
      transform translate3d(-50%, 0, 0)
      width (2391 / 900) * 100vh

    path
      fill none
      stroke-miterlimit 10

  .upper
    transition transform 2s $easeOutCubic

  .shade
    background rgba(0,0,0,.55)
    backdrop-filter blur(8px)
    opacity 0
    transform translate3d(0,0,0)
    z-index 1
</style>
