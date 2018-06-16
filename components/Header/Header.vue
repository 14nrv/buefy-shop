<template lang="pug">
  header.navbar.is-light(:class="{ 'is-fixed-top': isIndexRoute }",
                        role="navigation",
                        aria-label="main navigation")
    .container.is-flex-touch
      .navbar-brand
        nuxt-link.navbar-item(exact, :to="{name: 'index'}")
          strong
            i PlusGrosLeLogo
      .navbar-end.is-flex-touch
        .navbar-item
          .field
            p.control
              a.button.is-light.is-marginless-mobile(target="_blank",
                                href="https://github.com/14nrv/buefy-shop",
                                rel="noopener")
                span.icon
                  i.fab.fa-github
                span.is-hidden-mobile Fork
        .navbar-item
          .field
            p.control
              nuxt-link.button.is-light(exact, :to="{name: 'cart'}")
                span.icon.cartitem
                  .cartcount(v-if="total > 0") {{ total }}
                  i.fa.fa-shopping-cart
                span.is-hidden-mobile Cart
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('cart')

export default {
  name: 'AppHeader',
  head () {
    return {
      htmlAttrs: {
        class: this.isIndexRoute && 'has-navbar-fixed-top'
      }
    }
  },
  computed: {
    ...mapGetters(['total']),
    isIndexRoute() {
      return this.$route.name === 'index'
    }
  }
}
</script>

<style lang="stylus">
  .hero-head
    .navbar
      &.is-light
        background-color #f5f5f5

      > .container
        flex-wrap: wrap
        justify-content: space-between

    .cartitem
      position relative
      float right

    .cartcount
      font-family 'Barlow', sans-serif
      position absolute
      background #ff2211
      color white
      text-align center
      padding-top 2px
      height 18px
      width @height
      font-size 10px
      margin -8px 0 0 8px
      border-radius 50%
      font-weight 700

    @media (max-width: 600px)
      .button
        padding-left 0.2rem
        padding-right @padding-left

        .icon
          &:first-child
            &:not(:last-child)
              margin-left 0
              margin-right 0

      .navbar-item
        padding-left .5rem
        padding-right @padding-left
</style>
