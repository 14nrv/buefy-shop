<template lang="pug">
  .container
    .section
      .capsule.cart.content
        StepMenu(:actualStep="actualStep", :menu="stepMenuContent")

        div(v-if="total > 0")
          div(v-if="actualStep === 0")
            transition-group.content(name="items", tag="div")
              CartProductListItem(v-for="item in cart",
                                  :key="item.name",
                                  :item="item")

            .is-clearfix
              h3.total.is-pulled-left Total: {{ amount | usdollar }}
              button.button.is-success.is-pulled-right(@click="actualStep=1") > Next

          div(v-if="actualStep === 1")
            Checkout(:total="amount",
                     @successSubmit="success = true, actualStep=2")

        .empty.has-text-centered(v-else-if="total === 0 && success === false")
          h3 Your cart is empty.
          nuxt-link(exact to="/")
            button.button Fill er up!

        .has-text-centered(v-else)
          h2 Success!
          p Your order has been processed, it will be delivered shortly.
          nuxt-link(exact to="/")
            button.button Fill again your cart
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Checkout from '@/components/Checkout'
import CartProductListItem from '@/components/CartProductListItem'
import StepMenu from '@/components/StepMenu'
import stepMenuContent from '@/components/StepMenu/stepMenuContent.json'

const { mapGetters } = createNamespacedHelpers('cart')

export default {
  head: {
    script: [
      { src: 'https://js.stripe.com/v3/' }
    ]
  },
  components: {
    StepMenu,
    CartProductListItem,
    Checkout
  },
  filters: {
    usdollar: value => `$${value}`
  },
  data:() => ({
    success: false,
    actualStep: 0,
    stepMenuContent
  }),
  computed: {
    ...mapGetters(['cart', 'total', 'amount'])
  }
}
</script>
