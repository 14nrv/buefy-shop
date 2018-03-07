<template lang="pug">
  aside.is-light.is-radius
    .sidearea
      label.subtitle.is-5(for="pricerange") Highest Price:
        span  ${{ pricerange }}
      input.slider#pricerange(type="range"
                              :value="pricerange"
                              :min="min"
                              :max="max"
                              step="1"
                              @input="updateHighprice($event.target.value)")
      span.min ${{ min }}
      span.max ${{ max }}
    app-switch(v-if="!sale")
    .sidearea
        h4.subtitle.is-5 Special Sale!
        p Shop now because half our items are greatly reduced
    .sidearea
      h4.subtitle.is-5 Contact Us
      p Questions? Call us at 1-888-555-SHOP, we're happy to be of service.
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Switch from './Switch.vue'

const { mapActions } = createNamespacedHelpers('product')

export default {
  name: 'Sidebar',
  components: {
    AppSwitch: Switch
  },
  props: {
    sale: {
      type: Boolean,
      default: false
    },
    pricerange: {
      type: [Number, String],
      default: 300
    }
  },
  data() {
    return {
      min: 0,
      max: 400
    }
  },
  methods: {
    ...mapActions(['updateHighprice'])
  }
}
</script>

<style lang="stylus" scoped>
  aside
    float left
    width 19.1489%
    padding 1.5rem
    position sticky

  .sidearea
    border-bottom 1px solid #ccc
    padding 20px 0

    &:first-of-type
      padding-top 0
      padding-bottom 40px

    &:last-of-type
      border none
      padding-bottom 0

    .subtitle
      padding-bottom 10px
      margin-bottom 0

  span
    font-family 'Barlow', sans-serif

  .min,
  .max
    font-size 12px
    color #565656

  .max
    float right

  .min
    float left

</style>
