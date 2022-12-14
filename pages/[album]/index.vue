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
            :href="'//open.spotify.com/album/' + rdrAlbum.spotters"
            :title="rdrAlbum.title + ' on Spotify'"
            target="_blank"
            rel="noopener"
          >
            <svg-spotify fill="#fff" />
          </a>

          <a
            :href="'//wearezigo.bandcamp.com/album/' + rdrAlbum.slug"
            :title="rdrAlbum.title + ' on Bandcamp'"
            target="_blank"
            rel="noopener"
          >
            <svg-bandcamp fill="#fff" />
          </a>

          <a
            :href="'//soundcloud.com/wearezigo/sets/' + rdrAlbum.slug"
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
            :href="'//open.spotify.com/album/' + rdrAlbum.tracks[0].spotters"
            :title="rdrAlbum.tracks[0].title + ' on Spotify'"
            target="_blank"
            rel="noopener"
          >
            <svg-spotify fill="#fff" />
          </a>

          <a
            :href="'//wearezigo.bandcamp.com/album/' + rdrAlbum.tracks[0].slug"
            :title="rdrAlbum.tracks[0].title + ' on Bandcamp'"
            target="_blank"
            rel="noopener"
          >
            <svg-bandcamp fill="#fff" />
          </a>

          <a
            :href="'//soundcloud.com/wearezigo/' + rdrAlbum.tracks[0].slug.replace('-you', '')"
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
  +above($mobile)
    height 100%

  +below($mobile)
    padding 15vh 0

  &, .sec-content
    +above($tablet)
      align-items center
      display flex
      width 100%

  .artwork-wrap
    +above($mobile)
      display flex
      justify-content flex-end
      width 50%

    +below($mobile)
      pad(.5,1)

  .artwork
    border 1px solid rgba($w,.1)

    +above($mobile)
      height 60vh
      width 60vh

    img
      width 100%

  .tracklist
    pad(.5,1)

    +above($mobile)
      width 50%

    h1
      fs(mp(3))
      margin-top 0
      text-transform uppercase

      +below($mobile)
        text-align center

  .tracks
    counter-reset tracks
    list-style none
    padding 0 0 0 1em

  .track
    fs(mp(1))
    line-height (($lh*1.5)/mp(1))
    position relative
    word-spacing -.2em

    &::before
      counter-increment tracks
      content counter(tracks)
      fs(mp(0))
      line-height (($lh*1.5)/mp(0))
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
      mgn(1,0)
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
