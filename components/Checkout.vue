<template lang="pug">
  .content
    transition(name="fade")

      .payment(v-if="status !== 'failure'")
        h3 Please enter your payment details:

        .field
          label.label(for="email") Email
          input.input#email(type="email",
                            v-model="stripeEmail",
                            placeholder="name@example.com")

        .field
          label.label(for="card") Credit Card
          p.help
            | Test using this credit card:&nbsp;
            strong 4242 4242 4242 4242,<br>
            | and enter any 5 digits for the zip code

        .field
          card.stripe-card.input#card(:class='{ complete }',
                                stripe='pk_test_5ThYi0UvX3xwoNdgxxxTxxrG',
                                :options='stripeOptions',
                                @change='complete = $event.complete')

        .field
          button.button.is-success.pay-with-stripe(@click='pay',
                                                   :disabled='!complete || !stripeEmail',
                                                   :class="{ 'is-loading': isLoading }")
            | Pay with credit card

      .statussubmit(v-if="status === 'failure'")
        h3 Oh No!
        p Something went wrong!
        button(@click="clearCart") Please try again

</template>

<script>
import axios from 'axios'
import { Card, createToken } from 'vue-stripe-elements-plus'
import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('cart')
const STRIPE_URL = 'https://sdras-stripe.azurewebsites.net/api/charge?code=zWwbn6LLqMxuyvwbWpTFXdRxFd7a27KCRCEseL7zEqbM9ijAgj1c1w=='

export default {
  components: {
    Card
  },
  props: {
    total: {
      type: [Number, String],
      required: true
    },
    success: {
      type: Boolean,
      default: false
    },
    stripeUrl: {
      type: String,
      default: STRIPE_URL
    }
  },
  data() {
    return {
      submitted: false,
      complete: false,
      status: undefined,
      response: undefined,
      isLoading: false,
      stripeOptions: {
        // you can configure that cc element. I liked the default, but you can
        // see https://stripe.com/docs/stripe.js#element-options for details
      },
      stripeEmail: ''
    }
  },
  methods: {
    ...mapActions(['clearCount', 'clearContents']),

    async pay() {
      this.isLoading = true

      // eslint-disable-next-line
      const { token } = await createToken()
      this.submitted = true

      try {
        const stripeRespone = await axios.post(
          this.stripeUrl,
          {
            stripeEmail: this.stripeEmail,
            stripeToken: 'tok_visa',
            stripeAmt: this.total
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        this.status = 'success'
        this.$emit('successSubmit')

        this.clearCount()
        this.clearContents()

        this.response = JSON.stringify(stripeRespone, null, 2)
      } catch (err) {
        this.status = 'failure'
        this.response = `Error: ${JSON.stringify(err, null, 2)}`
      }
      this.isLoading = false
    },
    clearCart() {
      this.submitted = false
      this.complete = false
      this.status = ''
      this.response = ''
    }
  }
}
</script>

<style scoped lang="stylus">
.payment
  border 1px solid #ccc
  max-width 500px
  padding 50px
  display flex
  flex-direction column
  margin 0 auto

.statussubmit
  text-align center

.stripe-card
  margin-bottom 10px

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