<script setup>
import disco from '@/assets/disco.json'
import { formatHyperfollow } from '@/utils/helpers'
useHead({
  title: 'Linktree',
})
const ganye = [
  { title: 'Bandcamp', url: 'https://wearezigo.bandcamp.com/track/ganye' },
  {
    title: 'Spotify',
    url: 'https://open.spotify.com/track/5yxa2apdWQX91FxsWeuuVs',
  },
  {
    title: 'Apple Music',
    url: 'https://music.apple.com/album/ganye-single/6837373159',
  },
  {
    title: 'All platforms',
    url: 'https://distrokid.com/hyperfollow/zigo6/ganye',
  },
]
const sophia = [
  { title: 'Bandcamp', url: 'https://wearezigo.bandcamp.com/track/sophia' },
  { title: 'Streaming', url: 'https://distrokid.com/hyperfollow/zigo/sophia' },
]
const links = [
  { title: 'Website', url: '/' },
  { title: 'Who are ZIGO?', url: '/band' },
]
</script>

<template>
  <main>
    <div class="links-content">
      <h1 class="page-title">Links</h1>

      <h2 class="links-title">Listen to Ganye</h2>

      <ul class="links">
        <li v-for="link in ganye" :key="link.id">
          <a
            :href="link.url"
            :title="'Ganye on ' + link.title"
            target="_blank"
            rel="noopener"
          >
            <div class="link">
              <span class="link-title">{{ link.title }}</span>
            </div>
          </a>
        </li>
      </ul>

      <a
        href="https://distrokid.com/hyperfollow/zigo6/ganye"
        title="Ganye on all platforms"
        target="_blank"
        rel="noopener"
      >
        <nuxt-img
          :src="`/static/covers/ganye.jpg`"
          alt="ZIGO - Ganye"
          sizes="600"
        />
      </a>

      <h2 class="links-title">Listen to Sophia</h2>

      <ul class="links">
        <li v-for="link in sophia" :key="link.id">
          <a
            :href="link.url"
            :title="'Sophia on ' + link.title"
            target="_blank"
            rel="noopener"
          >
            <div class="link">
              <span class="link-title">{{ link.title }}</span>
            </div>
          </a>
        </li>
      </ul>

      <a
        href="https://distrokid.com/hyperfollow/zigo/sophia"
        title="Sophia on all platforms"
        target="_blank"
        rel="noopener"
      >
        <nuxt-img
          :src="`/static/covers/sophia.jpg`"
          alt="ZIGO - Sophia"
          sizes="600"
        />
      </a>

      <h2 class="links-title">More Music</h2>

      <ul class="links">
        <li v-for="album in disco" :key="album.id">
          <a
            :href="formatHyperfollow(album.hyperfollow)"
            :title="album.title + ' on all platforms'"
            target="_blank"
            rel="noopener"
          >
            <div class="link album-link">
              <span class="album-title">{{ album.title }}</span>
              <nuxt-img
                class="album-cover"
                :src="`/static/covers/${album.id}.jpg`"
                :alt="album.title"
                sizes="72"
              />
            </div>
          </a>
        </li>
      </ul>

      <h2 class="links-title">More online</h2>

      <ul>
        <li v-for="link in links" :key="link.url">
          <NuxtLink :to="link.url" :title="link.title">
            <div class="link">
              <span class="link-title">{{ link.title }}</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </main>
</template>

<style lang="stylus">
@import "../assets/styl/_variables"

.links-content {
  pad(3, .5)
  mgn(0, auto)
  margin-bottom 50vh
  max-width $pwidth*1rem

  .page-title {
    font-size 0
    margin 0
    opacity 0
  }

  .links-title {
    fs(mp(-1))
    font-family $montserrat
    font-weight 500
    text-align center
    text-transform uppercase
    letter-spacing .15em
    word-spacing normal
    mgn(1, auto, .5)
  }

  .link {
    border 1px solid rgba($w,.15)
    background rgba($w,.15)
    backdrop-filter blur(10px)
    border-radius .5rem
    align-items center
    justify-content center
    display flex
    gap $let*.5rem
    pad(.25, .5)
    mgn(.25, auto)
  }

  a:active {
    .link {
      background rgba($pink,.15)
    }
  }

  .link-title {
    text-align center
  }

  // Album
  .album-link {
    justify-content flex-start
  }

  .album-title {
    order 2
    line-height $let*.75
    text-transform uppercase
    max-width 15em
  }

  .album-cover {
    order 1
    width $gut*2rem
  }
}
</style>
