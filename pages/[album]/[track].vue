<template>
  <section class="track-page">
    <div
      v-if="rdrTrack.lyrics"
      class="lyrics"
    >
      <div
        v-html="rdrTrack.lyrics"
      />
      <div
        v-if="credits"
        class="credits"
        v-html="credits"
      />
    </div>
  </section>
</template>

<script>

import disco from '@/assets/disco.json'

export default {

  props: {
    album: {
      type: String,
      default: ''
    },

    track: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      disco,
      rdrTrack: {},
      credits: ''
    }
  },

  mounted() {
    for (const album in this.disco) {
      if (this.$route.params.album === this.disco[album].slug) {
        for (const track in this.disco[album].tracks) {
          if (this.$route.params.track === this.disco[album].tracks[track].slug) {
            this.rdrTrack = this.disco[album].tracks[track]
          }
        }
        this.rdrTrack.album = this.disco[album].id
        this.credits = this.rdrTrack.credits || this.disco[album].credits
      }
    }
  },

  methods: {
    src() {
      const url = (this.rdrTrack.album === 'tihie') ? '/static/tracks/tihie-inner-bg.jpg' : `/static/tracks/${this.rdrTrack.id}-bg.jpg`
      return url
    },

    type() {
      const size = (this.rdrTrack.album === 'fox' || this.rdrTrack.album === 'tihie') ? 'cover' : 'contain'
      return size
    }
  }
}

</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.track-page
  text-align center

  .lyrics
    display inline-block
    padding 100vh $gut*1em 50vh
    mgn(0, auto)
    text-align left
    word-spacing $let * -.1em

    p
      max-width 100%

  .credits
    border-top .5px solid
    opacity .6
    margin-top 25vh

    p
      fs(mp(-1))
      line-height $let * .5rem
      mgn(.5, 0)
      max-width 27em

</style>
