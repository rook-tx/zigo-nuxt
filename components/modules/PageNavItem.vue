<template>
  <li
    class="nav-item"
  >
    <nuxt-link
      :to="{ name: item.to }"
      :title="item.title"
      :style="{
        color: color
      }"
      class="nav-link"
    >
      {{ item.title }}
    </nuxt-link>
  </li>
</template>

<script>

export default {

  props: {
    item: {
      type: Object,
      default: null
    },

    color: {
      type: String,
      default: null
    }
  }

}

</script>

<style lang="stylus">

@import "../../assets/styl/_variables"

.page-nav {
	.nav-item {
		display inline-block
		height 100%

		+above($mobile) {
			width 11.55vh
		}
	}

	.nav-link {
		display block
		font-family $montserrat
		font-weight 400
		letter-spacing .15em
		position relative
		text-align center
		text-transform uppercase
		fs(mp(-2))
		line-height 10vh

		+below($mobile) {
			padding 0 .75em
		}

		&::before {
			border-top 2px solid
			content ''
			left 0
			opacity 0
			position absolute
			top 0
			transition opacity .3s
			width 100%
		}

		&.router-link-active {
			&::before {
				opacity 1
			}
		}

		+above($tablet) {
			font-weight 400
		}
	}
}

</style>
