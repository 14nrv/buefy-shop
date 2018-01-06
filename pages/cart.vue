<template lang="pug">
  .container
    .section
      .capsule.cart

        div(v-if="total > 0")
          CartStep(:actualStep=0)

          transition-group.content(name="items" tag="div")
            .box(v-for="item in cart" :key="item.name")
              article.media
                .media-left
                  figure.image.is-64x64
                    img(:src="`/products/${item.img}`" :alt="`Image of ${item.name}`")
                .media-content
                  .content
                    p
                      strong {{ item.name }}
                      <br>
                      span.itemCount {{ item.count }}
                      |  x {{ item.price | usdollar }} = ${{ item.count * item.price }}
                  nav.level.is-mobile
                    .level-left
                      a.level-item.removeItem(@click="removeItem(item)", title="Remove")
                        span.icon.is-small
                          i.fa.fa-trash
                      a.level-item
                        span.icon.is-small
                          i.fa.fa-retweet
                      a.level-item
                        span.icon.is-small
                          i.fa.fa-heart

          .is-clearfix
            h3.total.is-pulled-left Total: {{ amount | usdollar }}
            button.button.is-success.is-pulled-right  > Next

        div.empty(v-else-if="total === 0 && success === false")
          h3 Your cart is empty.
          nuxt-link(exact to="/")
            button Fill er up!

        div(v-else)
          h2 Success!
          p Your order has been processed, it will be delivered shortly.
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import CartStep from '@/components/CartStep.vue'

const { mapGetters, mapActions } = createNamespacedHelpers('cart')

export default {
  data() {
    return {
      success: false
    }
  },
  components: {
    CartStep
  },
  computed: {
    ...mapGetters(['cart', 'total', 'amount'])
  },
  filters: {
    usdollar: function(value) {
      return `$${value}`
    }
  },
  methods: {
    ...mapActions(['removeItem'])
  }
}
</script>

<style>

</style>
