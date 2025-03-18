<template>
  <div class="audio-frame">
    <audio
      ref="audio"
      :src="soundFile"
      controls
      @loadstart="loadstart"
      @durationchange="durationchange"
      @loadedmetadata="loadedmetadata"
      @loadeddata="loadeddata"
      @progress="progress"
      @canplay="canplay"
      @canplaythrough="canplaythrough"
      @timeupdate="timeupdate"
      @play="trackPlay"
      @pause="trackPause"
    />
  </div>
</template>

<script>

import { mapActions, mapState } from 'pinia'
import { usePlayerStore } from '@/stores/player'
import { useDiscoStore } from '@/stores/disco'

export default {

  computed: {
    ...mapState(usePlayerStore, [
      'playing',
      'position'
    ]),
    ...mapState(useDiscoStore, [
      'track',
      'idx'
    ]),

    soundFile() {
      return `/static/tracks/${this.track ? this.track : 'k'}.mp3`
    }
  },

  watch: {
    track: {
      handler() {
        this.$nextTick(() => {
          this.$refs.audio.play().then(() => {
            this.play()
          })
        })
      }
    },

    playing: {
      handler(playing) {
        if (playing) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    }
  },

  methods: {
    ...mapActions(usePlayerStore, [
      'play',
      'pause',
      'playreport'
    ]),
    ...mapActions(useDiscoStore, [
      'next'
    ]),

    loadstart() {
      // console.log(e)
    },

    progress(e) {
      this.playreport(e)
    },

    durationchange() {
      // console.log(e)
    },

    loadedmetadata() {
      // console.log(e)
    },

    loadeddata() {
      // console.log(e)
    },

    canplay() {
      // console.log(e)
    },

    canplaythrough() {
      // console.log(e)
    },

    timeupdate(e) {
      this.playreport(e)
    },

    trackPlay(e) {
      console.log(e)
    },

    trackPause(e) {
      console.log(e)
      if (this.position === 1) {
        this.next(this.idx)
      } else {
        this.pause()
      }
    }
  }
}

</script>

<style lang="stylus">

.audio-frame
  position absolute
  top 100%
  opacity 0
  height 0

</style>
