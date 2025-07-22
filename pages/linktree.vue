<script setup>
import disco from '@/assets/disco.json'
import { formatHyperfollow } from '@/utils/helpers'
useHead({
  title: 'Linktree',
})
const links = [
  { title: 'Website', url: '/' },
  { title: 'Who are ZIGO?', url: '/band' },
]
</script>

<template>
  <main>
    <div class="links-content">

      <h1 class="page-title">Links</h1>

      <h2 class="links-title">Listen now</h2>

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
                sizes="60"
              />
            </div>
          </a>
        </li>
      </ul>

      <h2 class="links-title">More online</h2>

      <ul>
        <li v-for="link in links" :key="link.url">
          <NuxtLink
            :to="link.url"
            :title="link.title"
          >
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
    // fs(mp(1))
    text-align center
  }

  // Album
  .album-link {
    justify-content flex-start
  }

  .album-title {
    order 2
    // fs(mp(1))
    line-height 1.2
    text-transform uppercase
  }
  
  .album-cover {
    order 1
  }
}

</style>
