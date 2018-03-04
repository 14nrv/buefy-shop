<template lang="pug">
  header.navbar.is-fixed-top.is-light(role="navigation"
                aria-label="main navigation")
    .container
      .navbar-brand
        nuxt-link.navbar-item(exact, :to="{name: 'index'}")
          strong
            i PlusGrosLeLogo
        div.navbar-burger.burger(data-target="navbarExampleTransparentExample"
                                :class="{'is-active': isBurgerMenuActive}"
                                @click="isBurgerMenuActive= !isBurgerMenuActive")
          span
          span
          span

      div#navbarExampleTransparentExample.navbar-menu(:class="{'is-active': isBurgerMenuActive}")
        .navbar-end
          .navbar-item
            .field.is-grouped
              p.control
                a.button.is-light(target="_blank"
                                      href="https://github.com/")
                  span.icon
                    i.fa.fa-github
                  span Fork
              p.control
                nuxt-link.button.is-light(exact, :to="{name: 'cart'}")
                  span.icon.cartitem
                    .cartcount(v-if="total > 0") {{ total }}
                    i.fa.fa-shopping-cart
                  span Cart
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('cart')

export default {
  name: 'Header',
  data() {
    return {
      isBurgerMenuActive: false
    }
  },
  head () {
    return {
      htmlAttrs: {
        class: 'has-navbar-fixed-top'
      }
    }
  },
  computed: {
    ...mapGetters(['total'])
  }
}
</script>

<style lang="stylus">
  .hero
    .navbar
      &.is-light
        background-color #f5f5f5

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
    width 18px
    height 18px
    font-size 10px
    margin -8px 0 0 8px
    border-radius 50%
    font-weight 700
</style>
