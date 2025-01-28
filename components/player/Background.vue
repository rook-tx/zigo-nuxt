<template>
  <div class="background-cover">
    <transition>
      <div
        :key="image"
        class="outer"
      >
        <div
          ref="inner"
          class="inner"
          :style="{
            backgroundImage: `url(${image})`,
            backgroundColor: color,
            backgroundPosition: `${position}% center`,
            backgroundSize: size
          }"
        />
      </div>
    </transition>

    <div
      class="shade"
      :style="{
        opacity: opacity
      }"
    />

    <div class="gradient" />

    <div
      ref="over"
      class="over"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2391 900"
        :height="winHeight"
        :width="winHeight * (2391 / 900)"
        :style="{
          stroke: stroke
        }"
      >
        <path d="M1143.14-.08l519.72 900.16" /><path d="M1039.14-.08l519.72 900.16" /><path d="M935.14-.08l519.72 900.16" /><path d="M831.14-.08l519.72 900.16" /><path d="M727.14-.08l519.72 900.16" /><path d="M623.14-.08l519.72 900.16" /><path d="M519.14-.08l519.72 900.16" /><path d="M415.14-.08l519.72 900.16" /><path d="M311.14-.08l519.72 900.16" /><path d="M207.14-.08l519.72 900.16" /><path d="M103.14-.08l519.72 900.16" /><path d="M-.86-.08l519.72 900.16" /><path d="M-1 179l415.86 721.08" /><path d="M0 362l310.86 538.08" /><path d="M0 542l206.86 358.08" /><path d="M-1 721l103.86 179.08" /><path d="M1247.14-.08l519.72 900.16" /><path d="M1351.14-.08l519.72 900.16" /><path d="M1455.14-.08l519.72 900.16" /><path d="M1559.14-.08l519.72 900.16" /><path d="M1663.14-.08l519.72 900.16" /><path d="M1767.14-.08l519.72 900.16" /><path d="M1871.14-.08l519.72 900.16" /><path d="M1975.14-.08L2391 720" /><path d="M2079.14-.08L2391 540" /><path d="M2183.14-.08L2391 360" /><path d="M2287.14-.08L2394 184" /><path d="M1143.14 900.08L1662.86-.08" /><path d="M1039.14 900.08L1558.86-.08" /><path d="M935.14 900.08L1454.86-.08" /><path d="M831.14 900.08L1350.86-.08" /><path d="M727.14 900.08L1246.86-.08" /><path d="M623.14 900.08L1142.86-.08" /><path d="M519.14 900.08L1038.86-.08" /><path d="M415.14 900.08L934.86-.08" /><path d="M311.14 900.08L830.86-.08" /><path d="M207.14 900.08L726.86-.08" /><path d="M103.14 900.08L622.86-.08" /><path d="M-.86 900.08L518.86-.08" /><path d="M-1 721L414.86-.08" /><path d="M0 538L310.86-.08" /><path d="M0 358L206.86-.08" /><path d="M-1 179L102.86-.08" /><path d="M1247.14 900.08L1766.86-.08" /><path d="M1351.14 900.08L1870.86-.08" /><path d="M1455.14 900.08L1974.86-.08" /><path d="M1559.14 900.08L2078.86-.08" /><path d="M1663.14 900.08L2182.86-.08" /><path d="M1767.14 900.08L2286.86-.08" /><path d="M1871.14 900.08L2390.86-.08" /><path d="M1975.14 900.08L2391 180" /><path d="M2079.14 900.08L2391 360" /><path d="M2183.14 900.08L2391 540" /><path d="M2287.14 900.08L2394 716" /><path d="M0 89h2391" /><path d="M0 179h2391" /><path d="M0 269h2391" /><path d="M0 359h2391" /><path d="M0 449h2391" /><path d="M0 539h2391" /><path d="M0 629h2391" /><path d="M0 719h2391" /><path d="M0 809h2391" />
      </svg>
    </div>
  </div>
</template>

<script>

import { mapState } from 'pinia'
import { useDeviceStore } from '@/stores/device'
import { useDiscoStore } from '@/stores/disco'

export default {

  props: {
    fade: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      color: '000',
      position: 50,
      size: 'cover',
      opacity: 0
    }
  },

  computed: {
    ...mapState(useDeviceStore, [
      'win',
      'winHeight'
    ]),
    ...mapState(useDiscoStore, [
      'obj',
      'ui',
      'idx'
    ]),

    image() {
      return this.obj.src || '/static/tracks/naam-bg.jpg'
    },

    stroke() {
      return `#${this.ui || 'fff'}`
    },

    type() {
      return this.obj.bgType
    },

    bg() {
      return this.obj.bgColor
    }
  },

  watch: {
    idx: {
      immediate: true,
      handler(idx) {
        if (idx < 12 && this.$route.name === 'album-track') {
          this.position = idx / 12 * 100
        } else {
          this.position = 50
        }
      },
    },

    type: {
      immediate: true,
      handler(type) {
        this.size = type
      },
    },

    bg: {
      immediate: true,
      handler(bg) {
        this.color = `#${bg}`
      },
    },

    fade: {
      immediate: true,
      handler(fade) {
        this.opacity = fade
      }
    }
  },
}

</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.background-cover
  &, .outer, .inner, .upper, .over, .shade, .gradient
    abs()
    transform translate3d(0,0,0)

  position fixed
  z-index 0

  .gradient
    background linear-gradient(0deg, rgba($b,.12), rgba($b,0) 35%, rgba($b,0) 65%, rgba($b,.12))

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
      stroke-width 1px
      stroke-miterlimit 10

  .upper
    transition transform 2s $easeOutCubic

  .shade
    background rgba(0,0,0,.65)
    backdrop-filter blur(4px)
    opacity 0
    transform translate3d(0,0,0)
    z-index 1

</style>
