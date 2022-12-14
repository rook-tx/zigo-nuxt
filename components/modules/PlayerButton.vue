<template>
  <div
    :class="[ type, 'button', buttonDown ? 'down' : '' ]"
    @mousedown.passive="down"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 116 100"
      width="116"
      height="100"
      :fill="fill"
    >

      <g v-if="type === 'playpause'">
        <g id="pause">
          <rect
            x="34"
            y="25"
            width="19"
            height="50"
            rx="1"
            ry="1"
          />
          <rect
            x="63"
            y="25"
            width="19"
            height="50"
            rx="1"
            ry="1"
          />
        </g>
        <path
          id="play"
          d="M85.92 50.61a.65.65 0 0 0 0-1.22L35.06 20c-.58-.34-1.06-.06-1.06.61v58.76c0 .67.48.95 1.06.61z"
        />
      </g>

      <g v-else-if="type === 'prev'">
        <path d="M30.53 49.5a.53.53 0 0 0 0 1l27.13 15.67c.48.28.87 0 .87-.5V34.33c0-.55-.39-.77-.87-.5z" />
        <path d="M49.77 49.5a.53.53 0 0 0 0 1l27.14 15.67c.48.28.87 0 .87-.5V34.33c0-.55-.39-.77-.87-.5z" />
      </g>

      <g v-else-if="type === 'next'">
        <path d="M85.47 50.5a.53.53 0 0 0 0-1L58.34 33.83c-.48-.27-.87-.05-.87.5v31.34c0 .55.39.78.87.5z" />
        <path d="M66.23 50.5a.53.53 0 0 0 0-1L39.09 33.83c-.48-.27-.87-.05-.87.5v31.34c0 .55.39.78.87.5z" />
      </g>

    </svg>
  </div>
</template>

<script>

import { mapState } from 'pinia'
import { useDiscoStore } from '@/stores/disco'

export default {
  props: {
    type: {
      type: String,
      default: 'playpause'
    }
  },

  data() {
    return {
      buttonDown: false,
      fill: `#${this.ui}`
    }
  },

  computed: {
    ...mapState(useDiscoStore, [
      'ui'
    ])
  },

  watch: {
    ui: {
      immediate: true,
      handler(ui) {
        this.fill = `#${ui}`
      }
    }
  },

  methods: {
    down() {
      this.buttonDown = true
      this.$emit('down')
      window.addEventListener('mouseup', this.up, { passive: true })
    },

    up() {
      this.buttonDown = false
      this.$emit('up')
      window.removeEventListener('mouseup', this.up, { passive: true })
    }
  }
}

</script>

<style lang="stylus" scoped>

@import "../../assets/styl/_variables"

.button {
	cursor: pointer;
  height: 10vh;
  left: 50%;
  margin-left: -5.8vh;
  position: absolute;
  width: 11.6vh;
  z-index: 1;
}

svg {
  display: block;
  height: 100%;
  width: 100%;
}

path, circle {
  stroke-linejoin: round;
}

.next {
  margin-left: 5.8vh;
}

.prev {
  margin-left: -17.4vh;
}

#play, #pause {
  transition: all .3s $easeInOutExpo;
}

#play {
  .playing & {
    opacity: 0;
  }
}

#pause {
  .paused & {
    opacity: 0;
  }
}

</style>
