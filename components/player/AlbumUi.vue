<template>
  <div class="album-ui">
    <div
      v-if="!loading"
      :class="[ 'badge', rdrAlbum.id ? rdrAlbum.id : '']"
    >
      <div class="tracklist">
        <h3
          :style="{
            color: `#${ui}`
          }"
          v-html="rdrAlbum.title"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'pinia'
import { useDiscoStore } from '@/stores/disco'

import disco from '@/assets/disco.json'

export default {

  data() {
    return {
      loading: true,
      disco
    }
  },

  computed: {
    ...mapState(useDiscoStore, [
      'album',
      'track',
      'ui'
    ])
  },

  watch: {
    album: {
      handler() {
        this.getAlbum()
      }
    }
  },

  mounted() {
    this.getAlbum()
  },

  methods: {
    getAlbum() {
      for (const album in disco) {
        if (this.album === disco[album].slug) {
          this.rdrAlbum = disco[album]
          this.loading = false
        }
      }
    }
  }
}

</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.album-ui
  bottom: 0
  left: 0
  padding-left: 5.8vh
  position: absolute
  z-index: 4

  +below($mobile)
    display: none

  .badge
    align-items: center
    display: flex
    height: 10vh
    justify-content: flex-start

  .artwork-wrap
    padding: 1vh 0

  .artwork
    border: 1px solid rgba($w,.1)
    height: 8vh
    width: 8vh

    img
      width: 100%

  h3
    display: inline-block
    fs(mp(0))
    text-transform: uppercase
    vertical-align: middle

  .network
    display: inline-block
    font-size: 2vh
    vertical-align: middle

    a
      display: inline-block
      vertical-align: middle

  .tihie
    h3
      font-family: $franklin
      word-spacing: normal

    .track
      fs(mp(0))
      font-family: $franklin
      text-transform: uppercase
      word-spacing: normal

      &::before
        fs(mp(-1))

      span
        background: darken($w,5%)
        color: #111820
        pad(.25,.5)

        .open &
          background: $b
          color: $w

  svg
    display: block
    height: 2vh
    width: 2vh

  .apple
    width: (19/23)*2vh

</style>
