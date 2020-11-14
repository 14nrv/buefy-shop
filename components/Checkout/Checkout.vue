<template lang="pug">
  .content
    transition(name="fade")

      form.payment(v-if="status !== 'failure'", @submit.prevent="beforePay")
        h3 Please enter your payment details:

        .field
          label.label(for="card") Credit Card
          p.help
            | Test using this credit card:&nbsp;
            strong 4242 4242 4242 4242,<br>
            | and enter any 5 digits for the zip code

        .field
          card.stripe-card.input#card(:class="{ 'complete': isStripeCardCompleted }",
                                      :stripe="stripePublishableKey",
                                      @change="setIsStripeCardCompleted($event.complete)")

        .field
          button.button.is-success.pay-with-stripe(:disabled="!isStripeCardCompleted",
                                                   :class="{ 'is-loading': isLoading }")
            | Pay with credit card

      .statusFailure.has-text-centered(v-if="status === 'failure'")
        h3 Oh No!
        p Something went wrong!
        button.button(@click="clearCheckout") Please try again

</template>

<script>
import { Card } from 'vue-stripe-elements-plus'
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapGetters } = createNamespacedHelpers('checkout')
const { mapGetters: mapGettersCart } = createNamespacedHelpers('cart')
const STRIPE_URL = process.env.STRIPE_URL

export default {
  name: 'Checkout',
  components: {
    Card,
  },
  computed: {
    ...mapGetters(['isStripeCardCompleted', 'status', 'isLoading']),
    ...mapGettersCart(['shippingInformation']),
    stripePublishableKey: () => process.env.STRIPE_PUBLISHABLE_KEY
  },
  props: {
    total: {
      type: [Number, String],
      required: true
    },
  },
  methods: {
    ...mapActions([
      'clearCheckout',
      'pay',
      'setIsStripeCardCompleted',
    ]),

    async beforePay() {
      await this.pay({
        url: STRIPE_URL,
        userData: this.shippingInformation,
        total: this.total,
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.payment
  border 0.1rem solid #ccc
  max-width 50rem
  padding 5rem
  display flex
  flex-direction column
  margin 0 auto

.stripe-card
  margin-bottom 1rem

  &.input
    display block

/* -- transition --*/
.fade-enter-active,
.fade-leave-active
  transition opacity 0.25s ease-out

.fade-enter,
.fade-leave-to
  opacity 0
</style>
