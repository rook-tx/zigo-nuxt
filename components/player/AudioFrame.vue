<template>
  <div class="audio-frame">
    <audio
      ref="audio"
      :src="soundFile"
      controls
      @progress="progress"
      @timeupdate="timeupdate"
      @pause="trackPause"
    />
    <!-- @loadstart="loadstart"
      @durationchange="durationchange"
      @loadedmetadata="loadedmetadata"
      @loadeddata="loadeddata"
      @canplay="canplay"
      @canplaythrough="canplaythrough"
      @play="trackPlay" -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { usePlayerStore } from '@/stores/player'
import { useDiscoStore } from '@/stores/disco'

export default {
  computed: {
    ...mapState(usePlayerStore, ['playing', 'position']),
    ...mapState(useDiscoStore, ['track', 'idx']),

    soundFile() {
      return `/static/tracks/${this.track ? this.track : 'k'}.mp3`
    },
  },

  watch: {
    track: {
      handler() {
        this.$nextTick(() => {
          this.$refs.audio.play().then(() => {
            this.play()
          })
        })
      },
    },

    playing: {
      handler(playing) {
        if (playing) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      },
    },
  },

  methods: {
    ...mapActions(usePlayerStore, ['play', 'pause', 'playreport']),
    ...mapActions(useDiscoStore, ['next']),

    progress(e) {
      this.playreport(e)
    },

    timeupdate(e) {
      this.playreport(e)
    },

    trackPause() {
      if (this.position === 1) {
        this.next(this.idx)
      } else {
        this.pause()
      }
    },
  },
}
</script>

<style lang="stylus">

.audio-frame
  position absolute
  top 100%
  opacity 0
  height 0

</style>
