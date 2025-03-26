<template>
  <div class="album-ui">
    <div v-if="!loading" :class="['badge', rdrAlbum.id ? rdrAlbum.id : '']">
      <div class="tracklist">
        <nuxt-link :to="`/${rdrAlbum.slug}`" class="tracklist-link">
          <h3
            class="tracklist-title"
            :style="{
              color: fade ? '#ccc' : color,
            }"
          >
            {{ rdrAlbum.title }}
          </h3>
        </nuxt-link>
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
      rdrAlbum: {},
      loading: true,
      disco,
    }
  },

  computed: {
    ...mapState(useDiscoStore, ['album', 'track', 'color', 'fade']),
  },

  watch: {
    album: {
      handler() {
        this.getAlbum()
      },
    },
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
    },
  },
}
</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.album-ui
  bottom 0
  left 0
  padding-left 5.8vh
  position absolute
  z-index 6

  +below($mobile)
    display none

  .badge
    align-items center
    display flex
    height 10vh
    justify-content flex-start

  .artwork-wrap
    padding 1vh 0

  .artwork
    border 1px solid rgba($w,.1)
    height 8vh
    width 8vh

    img
      width 100%

  .tracklist
    &-link
      @media (hover:hover)
        &:hover
          .tracklist-title
            text-decoration underline

    &-title
      display inline-block
      fs(mp(0))
      text-transform uppercase
      transition color .3s
      vertical-align middle

  .tihie
    .tracklist-title
      font-family $franklin
      word-spacing normal

</style>
