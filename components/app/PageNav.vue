<template>
  <nav class="page-nav">
    <ul>
      <item
        v-for="route in routes"
        :key="route.title"
        :item="route"
        :ui="ui"
      />

      <li class="social-item">
        <a
          href="https://open.spotify.com/album/38EQ0oOvcSIrRFxXCcinNZ"
          target="_blank"
          rel="noopener"
          title="Listen to ZIGO on Spotify"
          class="social-link"
        >
          <svg-spotify :fill="'#' + ui" />
        </a>
      </li>

      <li class="social-item">
        <a
          href="https://itunes.apple.com/album/the-fox-ep/1020163446"
          target="_blank"
          rel="noopener"
          title="Listen to ZIGO on Apple Music"
          class="social-link"
        >
          <svg-apple
            :fill="'#' + ui"
            class="apple"
          />
        </a>
      </li>

      <li class="social-item">
        <a
          href="https://www.instagram.com/wearezigo/"
          target="_blank"
          rel="noopener"
          title="Follow ZIGO on Instagram"
          class="social-link"
        >
          <svg-instagram :fill="'#' + ui" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>

import { mapState } from 'pinia'
import { useDiscoStore } from '@/stores/disco'

import PageNavItem from './PageNavItem.vue'

export default {

  components: {
    Item: PageNavItem,
  },

  data() {
    const routes = [
      {
        title: 'Music',
        to: 'music'
      },
      {
        title: 'Video',
        to: 'video'
      },
      {
        title: 'Band',
        to: 'band'
      }
    ]

    return {
      routes
    }
  },

  computed: {
    ...mapState(useDiscoStore, [
      'ui'
    ])
  }
}

</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.page-nav {
  ul {
    height 10%
    position absolute
    right 0
    top 0
    z-index 5

    +above($mobile) {
      padding-right 5.8vh
    }
  }

  li {
    display inline-block
    height 100%
    vertical-align top
  }

  .social-item {
    +below($mobile) {
      display none
    }
  }

  .social-link {
    display block
    padding 4vh 1vh
  }

  svg {
    display block
    height 2vh
    width 2vh
  }

  .apple {
    width (19/23)*2vh
  }
}

</style>
