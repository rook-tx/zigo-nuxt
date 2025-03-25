<template>
  <div class="preloader">
    <div class="spinner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 210 182"
        width="210"
        height="182"
      >
        <path d="M156.96 1L105 91h103.92L156.96 1zM53.04 1L1.08 91H105L53.04 1z" />
        <path d="M105 91l51.96-90H53.04L105 91z" />
        <path d="M105 91l-51.96 90h103.92L105 91z" />
        <path d="M53.04 181L105 91H1.08l51.96 90zm103.92 0l51.96-90H105l51.96 90z" />
        <g class="spin">
          <path d="M105 181l77.94-135H27.06L105 181z" />
          <circle
            cx="105"
            cy="91"
            r="90"
          />
        </g>
      </svg>
    </div>
    <div class="wordmark">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 236 68"
        width="236"
        height="68"
      >
        <path d="M8 .75a3.62 3.62 0 0 0 1.9 2.1 10.62 10.62 0 0 0 3.4.3H54l.7 1.2c-15.3 19.2-30.8 38.5-45.8 58.4 3.6.4 12.6.6 19.7.6 18.5 0 21.9-2.5 26.9-13.8l1.7.3c-.7 2.6-2.5 11.1-3.7 15.9H.9l-.4-1.1c15.1-19.6 30.7-38.9 46.1-59.1l-19.7.1c-15-.1-16.4 2.4-19.7 12.8H5.4c.5-5.1 1.1-11.8 1.2-17.7z" />
        <path d="M62 64.35c8.7-.4 9.5-2.1 9.5-10v-39.8c0-7.8-.8-9.5-9.5-10v-1.4h24.2v1.4c-8.6.5-9.5 2.2-9.5 10v39.8c0 7.9.9 9.6 9.5 10v1.4H62z" />
        <path d="M160.3 39.05c-5.9.9-6.2 2.2-6.2 6.6v9c0 3.5.1 6.5.9 8.5-6.5 1.6-15 4.1-23.2 4.1-21.8 0-37.2-13.2-37.2-32.2 0-21.9 18.5-33.4 38.2-33.4a74.1 74.1 0 0 1 19.5 2.7c.3 2.9.8 8.6 1.7 14.8l-1.6.2C149.1 6.75 141.3 4 131 4c-19.2 0-29.3 11.1-29.3 29.6 0 14 8 31.1 30.1 31.1a43 43 0 0 0 12.8-1.6c3-1 4.2-2.4 4.2-6.8v-8.7c0-6.1-.5-7.8-11.9-8.6v-1.4h23.4z" />
        <path d="M235.5 33.55c0 19.9-15.9 33.7-34.9 33.7-18.3 0-33.1-13.5-33.1-32 0-16.8 13-33.6 35.3-33.6 16.7 0 32.7 12.5 32.7 31.9zm-61-1.2c0 19.5 12.3 32.5 28.5 32.5 13.5 0 25.7-9.3 25.7-27.1C228.7 15 216 4 199.9 4c-13.3.15-25.4 9-25.4 28.35z" />
      </svg>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../../assets/styl/_variables"

.preloader {
	background-color $b
	top 0
	left 0
	z-index 10
	position absolute
	width 100%
	height 100%
	transition all 500ms $easeInOutCubic

	&.v-leave-to {
		opacity 0
	}

	.wordmark {
		left 50%
		position absolute
		top 50%
		transform translate3d(-50%,-50%,0)
		width 11.55vh
		z-index 5

		svg {
			display block
			fill $w
			height auto
			width 100%
		}
	}

	.spinner {
		height 20vh
		left 50%
		position absolute
		top 50%
		transform translate3d(-50%,-50%,0)
		width (210/182*20vh)
		z-index 4

		svg {
			display block
			height auto
			max-height 100%
			width 100%
		}

		path, circle {
			opacity .05
			fill none
			stroke $w
			stroke-miterlimit 10
		}

		.spin {
			animation spin 4s infinite linear
			transform-origin center

			circle {
				opacity .1
			}

			path {
				opacity .3
			}
		}
	}
}

@keyframes spin {
	0% {
		transform rotateZ(0deg)
	}

	100% {
		transform rotateZ(360deg)
	}
}

</style>
