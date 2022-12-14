<template>
  <div
    ref="canary"
    class="snif"
  />
</template>

<script>

import { mapActions } from 'pinia'
import { useDeviceStore } from '@/stores/device'

export default {

  data() {
    const device = {
      win: {
        x: 1440, // window.innerWidth,
        y: 900 // window.innerHeight
      },
      keys: null,
      mouse: null,
      touch: null
    }

    return {
      device
    }
  },

  watch: {
    device: {
      deep: true,
      handler(device) {
        this.updateDevice({ ...device })
      }
    }
  },

  mounted() {
    window.addEventListener('touchstart', this.touchstart, { passive: true })
    window.addEventListener('mousemove', this.mousestart, { passive: true })
    window.addEventListener('keydown', this.keystart, { passive: true })
    window.addEventListener('resize', this.resize, { passive: true })
    this.resize()
  },

  beforeUnmount() {
    window.removeEventListener('touchstart', this.touchstart, { passive: true })
    window.removeEventListener('mousemove', this.mousestart, { passive: true })
    window.removeEventListener('keydown', this.keystart, { passive: true })
    window.removeEventListener('resize', this.resize, { passive: true })
  },

  methods: {
    ...mapActions(useDeviceStore, [
      'updateDevice',
    ]),

    touchstart() {
      this.device.touch = true
      window.removeEventListener('touchstart', this.touchstart, { passive: true })
    },

    keystart() {
      this.device.keys = true
      window.removeEventListener('keydown', this.keystart, { passive: true })
    },

    mousestart() {
      this.device.mouse = true
      window.removeEventListener('mousemove', this.mousestart, { passive: true })
    },

    resize() {
      clearTimeout(this.winTimeout)

      this.winTimeout = setTimeout(() => {
        this.device.win = {
          x: document.documentElement.clientWidth ?? window.innerWidth,
          y: document.documentElement.clientHeight ?? window.innerHeight
        }
      }, 600)
    }
  }
}

</script>

<style lang="stylus">

@import '../../assets/styl/_variables'

.snif {
  display none
  pointer-events none
  position absolute

  +below($tablet) {
    display block
  }
}

</style>
