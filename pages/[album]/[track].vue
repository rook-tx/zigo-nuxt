<template>
  <section class="track-page">
    <div
      v-if="rdrAlbum.lyrics"
      class="lyrics"
      v-html="rdrAlbum.lyrics"
    />
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
    const rdrAlbum = []

    return {
      loading: true,
      disco,
      rdrAlbum
    }
  },

  mounted() {
    for (const album in this.disco) {
      if (this.$route.params.album === this.disco[album].slug) {
        for (const track in this.disco[album].tracks) {
          if (this.$route.params.track === this.disco[album].tracks[track].slug) {
            this.rdrAlbum = this.disco[album].tracks[track]
            this.loading = false
          }
        }
        this.rdrAlbum.album = this.disco[album].id
      }
    }
  },

  methods: {
    src() {
      let url = `/static/tracks/${this.rdrAlbum.id}-bg.jpg`
      if (this.rdrAlbum.album === 'tihie') {
        url = '/static/tracks/tihie-inner-bg.jpg'
      }
      return url
    },

    type() {
      let size = 'contain'
      if (this.rdrAlbum.album === 'fox' || this.rdrAlbum.album === 'tihie') {
        size = 'cover'
      }
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

</style>
