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
              button.button.is-success.is-pulled-right(@click="setActualStep(1)") > Next

          div(v-if="actualStep === 1")
            FormJson.container.shippingForm(:formFields="shippingFields",
                               :camelizePayloadKeys="true",
                               formName="shippingData",
                               :btnSubmit="{value: 'Submit'}",
                               :btnReset="{value: 'Reset'}")

          div(v-if="actualStep === 2")
            Checkout(:total="amount")

        .empty.has-text-centered(v-else-if="!total && !success")
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
import FormJson from 'vue-form-json'
import Checkout from '@/components/Checkout'
import CartProductListItem from '@/components/CartProductListItem'
import StepMenu from '@/components/StepMenu'
import stepMenuContent from '@/components/StepMenu/stepMenuContent.json'
import shippingFields from './shippingFields'
import 'vue-form-json/dist/vue-form-json.css'

const { mapGetters, mapActions } = createNamespacedHelpers('cart')

export default {
  head: {
    script: [
      { src: 'https://js.stripe.com/v3/' }
    ]
  },
  components: {
    CartProductListItem,
    Checkout,
    FormJson,
    StepMenu
  },
  filters: {
    usdollar: value => `$${value}`
  },
  data:() => ({
    shippingFields
  }),
  computed: {
    ...mapGetters(['cart', 'total', 'amount', 'success', 'actualStep']),
    stepMenuContent: () => stepMenuContent
  },
  mounted() {
    this.$root.$on('formSubmitted', ({ values }) => {
      const {
        address: line1,
        city,
        country: state,
        email,
        firstName,
        lastName,
        message: shipping,
        phoneNumber: phone,
        zip: postal_code,
      } = values

      const address = {
        line1,
        city,
        state,
        postal_code
      }

      const name = `${firstName} ${lastName}`

      this.setShippingInformation({
        address,
        email,
        name,
        phone,
        shipping: {
          address,
          name,
          phone
        }
      })
      this.setActualStep(2)
    })
  },
  methods: {
    ...mapActions(['setSuccess', 'setActualStep', 'setShippingInformation'])
  },
  beforeDestroy() {
    this.success && this.setSuccess(false)
    this.setActualStep(0)
  }
}
</script>

<style lang="stylus" scoped>
  .shippingForm.shippingForm
    max-width 28rem
</style>
