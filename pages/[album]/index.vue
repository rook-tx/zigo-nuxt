<template>
  <section class="album-page">
    <div
      v-if="!loading"
      :class="[ 'sec-content', rdrAlbum.id ]"
    >
      <div class="artwork-wrap">
        <div class="artwork">
          <img
            :src="src()"
            :alt="rdrAlbum.title"
          >
        </div>
      </div>

      <div class="tracklist">
        <h1 v-html="rdrAlbum.title" />

        <ol
          v-if="rdrAlbum.tracks.length > 1"
          :class="['tracks', rdrAlbum.id ? rdrAlbum.id : '']"
        >
          <li
            v-for="track in rdrAlbum.tracks"
            :key="track.slug"
            class="track"
          >
            <nuxt-link
              :to="'/' + rdrAlbum.slug + '/' + track.slug"
              class="snav-a"
              :title="track.title"
            >
              {{ track.title }}
            </nuxt-link>
          </li>
        </ol>

        <div
          v-if="rdrAlbum.tracks.length > 1"
          class="network"
        >
          <a
            v-if="rdrAlbum.spotters"
            :href="'https://open.spotify.com/album/' + rdrAlbum.spotters"
            :title="rdrAlbum.title + ' on Spotify'"
            target="_blank"
            rel="noopener"
          >
            <svg-spotify fill="#fff" />
          </a>

          <a
            :href="'https://wearezigo.bandcamp.com/album/' + rdrAlbum.slug"
            :title="rdrAlbum.title + ' on Bandcamp'"
            target="_blank"
            rel="noopener"
          >
            <svg-bandcamp fill="#fff" />
          </a>

          <a
            :href="'https://soundcloud.com/wearezigo/sets/' + rdrAlbum.slug"
            :title="rdrAlbum.title + ' on Soundcloud'"
            target="_blank"
            rel="noopener"
          >
            <svg-soundcloud fill="#fff" />
          </a>
        </div>

        <div
          v-else-if="rdrAlbum.tracks.length === 1"
          class="network"
        >
          <a
            v-if="rdrAlbum.tracks[0].spotters"
            :href="'https://open.spotify.com/album/' + rdrAlbum.tracks[0].spotters"
            :title="rdrAlbum.tracks[0].title + ' on Spotify'"
            target="_blank"
            rel="noopener"
          >
            <svg-spotify fill="#fff" />
          </a>

          <a
            :href="'https://wearezigo.bandcamp.com/album/' + rdrAlbum.tracks[0].slug"
            :title="rdrAlbum.tracks[0].title + ' on Bandcamp'"
            target="_blank"
            rel="noopener"
          >
            <svg-bandcamp fill="#fff" />
          </a>

          <a
            :href="'https://soundcloud.com/wearezigo/' + rdrAlbum.tracks[0].slug.replace('-you', '')"
            :title="rdrAlbum.tracks[0].title + ' on Soundcloud'"
            target="_blank"
            rel="noopener"
          >
            <svg-soundcloud fill="#fff" />
          </a>
        </div>
      </div>
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
    }
  },

  data() {
    return {
      loading: true,
      disco
    }
  },

  mounted() {
    for (const album in this.disco) {
      if (this.$route.params.album === this.disco[album].slug) {
        this.rdrAlbum = this.disco[album]
        this.loading = false
      }
    }
  },

  methods: {
    src() {
      const url = `/static/covers/${this.rdrAlbum.id}.jpg`
      return url
    },

    type() {
      let size = 'contain'
      if (this.rdrAlbum.id === 'fox' || this.rdrAlbum.id === 'tihie') {
        size = 'cover'
      }
      return size
    }
  }
}

</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.album-page
  +above($tablet)
    height 100%

  +below($tablet)
    padding 15vh 0

  &, .sec-content
    +above($tablet)
      align-items center
      display flex
      height 100%
      width 100%

  .sec-content
    +below($tablet)
      max-width $gut * 14rem
      margin 0 auto

  .artwork-wrap
    +above($tablet)
      display flex
      justify-content flex-end
      pad(0, 0, 0, 1)
      width 50%

    +below($tablet)
      pad(.5,.5)

  .artwork
    border 1px solid rgba($w,.1)

    +above($tablet)
      height 60vh
      width 60vh

    img
      width 100%

  .tracklist
    pad(.5,.5)

    +above($tablet)
      max-height 100%
      padding 10vh 0 10vh $gut * 1rem
      overflow auto
      width 50%

    h1
      fs(mp(3))
      margin-top 0
      text-transform uppercase

      +below($tablet)
        fs(mp(2))
        text-align center

  .tracks
    counter-reset tracks
    list-style none
    padding 0 0 0 1em

  .track
    fs(mp(1), ($lh*1.5))
    position relative
    word-spacing -.2em

    &::before
      counter-increment tracks
      content counter(tracks)
      fs(mp(0), ($lh*1.5))
      padding 0 .5em
      position absolute
      opacity .5
      right 100%
      text-align right
      top 0

  .network
    svg
      display inline-block
      height 3vh
      mgn(1,.5,1, 0)
      overflow visible
      vertical-align middle
      width 3vh

  .tihie
    h1
      fs(mp(2))
      font-family $franklin
      word-spacing normal

    .track
      fs(mp(0))
      font-family $franklin
      text-transform uppercase
      word-spacing normal

      &::before
        fs(mp(-1))

      span
        background darken($w,5%)
        color #111820
        pad(.25,.5)

        .open &
          background $b
          color $w

</style>
