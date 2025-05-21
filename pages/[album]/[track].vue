<script setup>
import disco from '@/assets/disco.json'
const route = useRoute()

const rdrTrack = computed(() => {
  for (const album in disco) {
    if (route.params.album === disco[album].slug) {
      for (const track in disco[album].tracks) {
        if (route.params.track === disco[album].tracks[track].slug) {
          return {
            ...disco[album].tracks[track],
            album: disco[album].id,
          }
        }
      }
    }
  }
  return disco.tihie
})

const credits = computed(() => {
  return rdrTrack.value.credits || disco[rdrTrack.value.album].credits
})

useHead({
  title: rdrTrack.value.title,
})
</script>

<template>
  <section class="track-page">
    <div v-if="rdrTrack.lyrics" class="lyrics">
      <div v-html="rdrTrack.lyrics" />
      <div v-if="credits" class="credits" v-html="credits" />
    </div>
  </section>
</template>

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

    &-title
      opacity 0
      font-size 0
      margin 0

  .credits
    border-top .5px solid
    opacity .6
    margin-top 25vh

    p
      fs(mp(-1))
      line-height $let * .5rem
      mgn(.5, 0)
      max-width 27em

.page-enter-active,
.page-leave-active
  .lyrics
    transition opacity .6s

.page-enter-from,
.page-leave-to
  .lyrics
    opacity 0

.page-enter-to,
.page-leave-from
  .lyrics
    opacity 1

</style>
