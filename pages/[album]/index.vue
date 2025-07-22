<script setup>
import disco from '@/assets/disco.json'
import { useDiscoStore } from '@/stores/disco'
import { formatHyperfollow } from '@/utils/helpers'
const route = useRoute()

const discoStore = useDiscoStore()

const rdrAlbum = computed(() => {
  for (const album in disco) {
    if (route.params.album === disco[album].slug) {
      return disco[album]
    }
  }
  return disco.tihie
})

const src = computed(() => `/static/covers/${rdrAlbum.value.id}.jpg`)

useHead({
  title: rdrAlbum.value.title || '',
})
</script>

<template>
  <section class="album-page">
    <div :class="['sec-content', rdrAlbum.id]">
      <div class="artwork-wrap">
        <div class="artwork">
          <nuxt-img :src="src" :alt="rdrAlbum.title" sizes="75vw md:50vw" />
        </div>
      </div>

      <div class="tracklist">
        <h1 class="album-title">{{ rdrAlbum.title }}</h1>

        <ol :class="['tracks', rdrAlbum.id ? rdrAlbum.id : '']">
          <li
            v-for="albumTrack in rdrAlbum.tracks"
            :key="albumTrack.slug"
            class="track"
          >
            <nuxt-link
              :to="`/${rdrAlbum.slug}/${albumTrack.slug}`"
              :class="[
                'snav-a',
                albumTrack.slug === discoStore.track && 'active',
              ]"
              :title="albumTrack.title"
            >
              {{ albumTrack.title }}
            </nuxt-link>
          </li>
        </ol>

        <div class="network">
          <a
            :href="formatHyperfollow(rdrAlbum.hyperfollow)"
            :title="rdrAlbum.title + ' on all platforms'"
            target="_blank"
            rel="noopener"
          >
            <svg-headless />
          </a>

          <a
            v-if="rdrAlbum.spotters"
            :href="`https://open.spotify.com/album/${rdrAlbum.spotters}`"
            :title="rdrAlbum.title + ' on Spotify'"
            target="_blank"
            rel="noopener"
          >
            <svg-spotify fill="#e6e6e6" />
          </a>
          
          <a
            v-if="rdrAlbum.apple"
            :href="`https://music.apple.com/${rdrAlbum.apple}`"
            :title="rdrAlbum.title + ' on Apple Music'"
            target="_blank"
            rel="noopener"
          >
            <svg-apple fill="#e6e6e6" />
          </a>

          <a
            :href="`https://wearezigo.bandcamp.com/album/${rdrAlbum.slug}`"
            :title="rdrAlbum.title + ' on Bandcamp'"
            target="_blank"
            rel="noopener"
          >
            <svg-bandcamp fill="#e6e6e6" />
          </a>

          <a
            :href="`https://soundcloud.com/wearezigo/${rdrAlbum.soundcloud}`"
            :title="rdrAlbum.title + ' on Soundcloud'"
            target="_blank"
            rel="noopener"
          >
            <svg-soundcloud fill="#e6e6e6" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

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
      flex-basis 60vh

    img
      width 100%

  .tracklist
    pad(.5,.5)

    +above($tablet)
      max-height 100%
      padding 10vh 0 10vh $gut * 1rem
      overflow auto
      width 50%

  .album-title
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

  .snav-a
    transition color .3s

    &.active
      color $pink

    @media (hover:hover)
      &:hover
        color $pink

  .network
    svg
      display inline-block
      height 3vh
      mgn(1,.5,1, 0)
      overflow visible
      vertical-align middle
      width 3vh

  .tihie
    .album-title
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

.page-enter-active,
.page-leave-active
  .artwork,
  .album-title,
  .track
    transition: opacity 0.5s $easeOutCubic
    transition-property transform, opacity

  .track
    for n in 1..12
      &:nth-child({n})
        transition-delay (n * .05s)

.page-enter-from,
.page-leave-to
  .artwork
    opacity: 0
    transform scale(.98)

  .album-title,
  .track
    opacity: 0
    transform translateY(50%)

.page-enter-to,
.page-leave-from
  .artwork
    opacity: 1
    transform scale(1)

  .album-title,
  .track
    opacity: 1
    transform translateY(0%)
</style>
