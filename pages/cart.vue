<template lang="pug">
  .container
    .section
      .capsule.cart
        CartStep(:actualStep="actualStep")

        div(v-if="total > 0")
          div(v-if="actualStep === 0")
            transition-group.content(name="items" tag="div")
              CartBox(v-for="(item, index) in cart",
                      :key="index",
                      :item="item",
                      :index="index")

            .is-clearfix
              h3.total.is-pulled-left Total: {{ amount | usdollar }}
              button.button.is-success.is-pulled-right(@click="actualStep=1") > Next

          .is-clearfix
            h3.total.is-pulled-left Total: {{ amount | usdollar }}
            button.button.is-success.is-pulled-right  > Next

        .empty(v-else-if="total === 0 && success === false")
          h3 Your cart is empty.
          nuxt-link(exact to="/")
            button.button Fill er up!

        div(v-else)
          h2 Success!
          p Your order has been processed, it will be delivered shortly.
          nuxt-link(exact to="/")
            button.button Fill again your cart
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import CartStep from '@/components/CartStep.vue'
import CartBox from '@/components/CartBox.vue'

const { mapGetters } = createNamespacedHelpers('cart')

export default {
  data() {
    return {
      success: false,
      actualStep: 0
    }
  },
  components: {
    CartStep,
    CartBox
  },
  computed: {
    ...mapGetters(['cart', 'total', 'amount'])
  },
  filters: {
    usdollar: function(value) {
      return `$${value}`
    }
  }
}
</script>
