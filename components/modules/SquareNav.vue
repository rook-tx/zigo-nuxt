<template>
  <nav class="square-nav">
    <ol class="albums">
      <li
        v-for="album in disco"
        :key="album.id"
        :class="['album', album.id]"
      >
        <nuxt-link :to="`/${album.slug}`">
          <h2 v-html="album.title" />
          <div class="artwork-wrap">
            <nuxt-img
              :src="bgim(album.id)"
              :alt="album.title"
            />
          </div>
        </nuxt-link>
      </li>
    </ol>
  </nav>
</template>

<script>
import disco from '@/assets/disco.json'

export default {
  data() {
    return {
      disco,
    }
  },

  methods: {
    bgim(album) {
      const url = `/static/covers/${album}.jpg`
      return url
    },
  },
}
</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.square-nav
  +above($mobile)
    height 100%
    left 0
    top 0
    position absolute
    width 100%

  +below($mobile)
    padding 15vh 0

  h2
    color $b
    fs(mp(0))
    min-height 2 * 1.2em
    line-height 1.2
    text-transform uppercase
    mgn(0, auto)
    max-width 12em

    +above($mobile)
      max-width 12em

    +below($mobile)
      color $w
      pad(0, 1)

  .tihie
    h2
      font-family $franklin
      word-spacing normal

  .albums
    display block

    +above($mobile)
      display flex
      height 100%
      pad(0, .5)
      flex-wrap wrap

  .album-title
    text-transform uppercase
    width 100%

  .side
    width 50%

  .side-title
    text-transform uppercase

  .track
    fs(mp(-1))

  .side-title, .track
    pad(0,.5)

  .album
    display block

    a
      display flex
      flex-direction column-reverse
      position relative
      text-align center
      width 100%

    +above($mobile)
      align-items center
      display flex
      height 100%
      width 50%

    @media screen and (min-width: $mobile) and (min-aspect-ratio: 1)
      width 25%

    +below($mobile)
      max-width $let * 12rem
      margin 0 auto

  .artwork-wrap
    background-repeat no-repeat
    flex-shrink 0
    pad(.5,.5)

    +below($mobile)
      pad(.5,1)

    img
      width 100%

  .persuasive-single
    .track
      fs(mp(0))
      text-transform uppercase

  .album.naam
    .album-title
      display none

.page-enter-active,
.page-leave-active
  .album
    transition: opacity 0.5s $easeOutCubic
    transition-property transform, opacity

    for n in 2..4
      &:nth-child({n})
        transition-delay (n * .1s)

.page-enter-from,
.page-leave-to
  .album
    opacity: 0
    transform translateY(5%)

.page-enter-to,
.page-leave-from
  .album
    opacity: 1
    transform translateY(0%)

</style>
