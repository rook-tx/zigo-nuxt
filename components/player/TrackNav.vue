<template>
  <nav
    :class="['track-nav', open ? ' open' : '']"
    :style="{
      width: `${winWidth}px`,
    }"
  >
    <div class="overlay" />

    <div ref="scroll" class="scroll">
      <div ref="albums" class="albums" @click="closeNav">
        <ol
          v-for="album in tracks"
          :key="album.id"
          :class="'album ' + album.id"
          :style="{
            color: fade ? '#ccc' : color,
          }"
        >
          <div class="artwork" />

          <li
            v-for="track in album.tracks"
            :key="track.title"
            ref="tracks"
            class="track"
          >
            <nuxt-link :to="`/${album.slug}/${track.slug}`" class="title">
              <span v-html="track.title" />
            </nuxt-link>
          </li>
        </ol>
      </div>
    </div>

    <div class="menu-cover" @click="openNav" />
  </nav>
</template>

<script>
import Scrollbar from 'smooth-scrollbar'

import { mapState } from 'pinia'
import { useDiscoStore } from '@/stores/disco'
import { useDeviceStore } from '@/stores/device'

import disco from '@/assets/disco.json'

export default {
  data() {
    return {
      open: false,
      color: '#fff',
      tracks: disco,
    }
  },

  computed: {
    ...mapState(useDeviceStore, ['winWidth', 'winHeight']),
    ...mapState(useDiscoStore, ['ui', 'idx', 'fade']),

    trackHeight() {
      return this.winHeight / 10
    },
  },

  watch: {
    winHeight: {
      handler() {
        this.resize()
      },
    },

    ui: {
      handler(ui) {
        this.updateTrack(ui)
      },
    },

    idx: {
      handler(idx) {
        this.updateScroll(idx)
      },
    },
  },

  mounted() {
    if (!this.scrollbar) {
      this.scrollbar = Scrollbar.init(this.$refs.scroll)
      this.$nextTick(() => {
        this.updateTrack(this.ui)
        this.resize()
      })
    }
  },

  beforeUnmount() {
    if (this.scrollbar) {
      this.scrollbar.destroy()
    }
  },

  methods: {
    openNav() {
      this.open = true
      this.color = '#fff'
    },

    closeNav() {
      this.open = false
      this.updateTrack(this.ui)
    },

    updateTrack(ui) {
      this.color = `#${ui}`
    },

    updateScroll(idx) {
      const top = idx * this.trackHeight
      setTimeout(() => {
        this.scrollbar.scrollTo(0, top, 1000)
      }, 500)
    },

    resize() {
      if (this.$refs.albums) {
        this.$refs.albums.style.paddingTop = `${this.trackHeight * 8}px`
        this.$refs.albums.style.paddingBottom = `${this.trackHeight}px`

        for (let i = 0; i < this.$refs.tracks.length; i++) {
          this.$refs.tracks[i].style.height = `${this.trackHeight}px`
          this.$refs.tracks[i].style.lineHeight = `${this.trackHeight}px`
        }

        this.updateScroll(this.idx)
      }
    },
  },
}
</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.track-nav {
	background rgba($b, .001)
	backdrop-filter blur(1px)
	clip-path polygon(0% 80%, 100% 80%, 100% 90%, 0% 90%)
	bottom 0
	height 100%
	left 0
	overflow hidden
	pointer-events none
	position absolute
	transform translate3d(0,0,0)
	transition all 1s $easeInOutCubic
	width 100%
	z-index 5

	@media screen and (min-aspect-ratio: 1) {
		backdrop-filter blur(0px)
	}

	&.open {
		background rgba($b, .8)
		backdrop-filter blur(6px)
		-webkit-clip-path polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)
		clip-path polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)

		.menu-cover {
			pointer-events none
		}

		.overlay {
			opacity 1
		}

		.scroll {
			pointer-events all
		}
	}

	.overlay {
		bottom 0
		left 0
		height 100%
		opacity 0
		right 0
		transition opacity 1s $easeInOutCubic
		z-index 1
	}

	.scroll {
		height 100%
		left 0
		pointer-events none
		position absolute
		overflow hidden
		top 0
		transition clip-path 1s $easeOutCubic
		width 100%
		z-index 3
	}

	.albums {
		padding-top 80vh
		padding-bottom 10vh
		z-index 3

		.open & {
			overflow auto
		}
	}

	.album {
		border-top 1px solid rgba($w,.05)
		counter-reset tracks
		margin 0
		padding 0
		margin-top -1px
		list-style none
	}

	.track {
		margin 0
		padding 0
		line-height 10vh
		transition background .3s
		white-space nowrap

		@media (hover:hover) {
			&:hover {
				background rgba($w,.1)
			}
		}
	}

	.title {
		display block
		fs(mp(1));
		line-height inherit
		word-spacing -.2em

		&::before {
			counter-increment tracks
			content counter(tracks)
			display inline-block
			fs(mp(0))
			line-height inherit
			opacity .5
			text-align center
			width 5.8vh

			li:only-child & {
				content ''
			}
		}
	}

	.side-title, .album-title {
		display inline-block
		pad(0,.5)
		text-transform uppercase

		&:last-child {
			fs(mp(-1))
		}
	}

	.menu-cover {
		background $w
		bottom 10%
		cursor pointer
		mix-blend-mode difference
		height 10%
		left 0
		opacity 0
		position absolute
		pointer-events all
		transition opacity .3s
		right 0
		z-index 3

		@media (hover:hover) {
			&:hover {
				opacity .1
			}
		}
	}

	.tihie {
		.title {
			font-family $franklin
			text-transform uppercase
			word-spacing normal

			span {
				background darken($w,5%)
				color #111820
				pad(.25,.5);

				.open & {
					background $b
					color $w
				}
			}
		}
	}
}
</style>
