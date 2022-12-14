<template>
  <li
    class="nav-item"
  >
    <!-- :to="{ name: item.to }" -->
    <nuxt-link
      :to="`/${item.to}`"
      :title="item.title"
      :style="'color:#' + ui"
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

    ui: {
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
		width 11.55vh

		+below($mobile) {
			display inline-block
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

		fs(mp(-2));
		line-height 10vh

		&::before {
			border-top 2px solid
			content ''
			left 0
			opacity 0
			position absolute
			top 0
			transition opacity .3s
			width 100%

			+below($mobile) {
				top -5vh
			}
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
