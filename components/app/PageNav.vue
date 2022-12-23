<template>
  <nav class="page-nav">
    <ul>
      <modules-page-nav-item
        v-for="route in routes"
        :key="route.title"
        :item="route"
        :color="color"
      />

      <li
        v-for="social in socials"
        :key="social.key"
        class="social-item"
      >
        <a
          :href="social.url"
          target="_blank"
          rel="noopener"
          :title="social.title"
          class="social-link"
        >
          <component
            :is="social.key"
            :fill="color"
            focusable="false"
          />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>

import { mapState } from 'pinia'
import { useDiscoStore } from '@/stores/disco'

import Spotify from '@/components/svg/Spotify.vue'
import Instagram from '@/components/svg/Instagram.vue'
import Apple from '@/components/svg/Apple.vue'

export default {

  components: {
    Spotify,
    Instagram,
    Apple
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

    const socials = [
      {
        key: 'spotify',
        comp: 'svg-spotify',
        title: 'Listen to ZIGO on Spotify',
        url: 'https://open.spotify.com/album/38EQ0oOvcSIrRFxXCcinNZ'
      },
      {
        key: 'apple',
        comp: 'svg-apple',
        title: 'Listen to ZIGO on Apple Music',
        url: 'https://itunes.apple.com/album/the-fox-ep/1020163446'
      },
      {
        key: 'instagram',
        comp: 'svg-instagram',
        title: 'Follow ZIGO on Instagram',
        url: 'https://www.instagram.com/wearezigo/'
      },
    ]

    return {
      routes,
      socials
    }
  },

  computed: {
    ...mapState(useDiscoStore, [
      'color'
    ])
  },

  methods: {
    mapComponent(key) {
      return `Svg${key.charAt(0).toUpperCase()}${key.slice(1)}`
    }
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
