<template lang="pug">
  .steps.is-large
    .step-item(v-for="(item, index) in menu",
               :key="item.name",
               :data-attr="index",
               :class="[actualStep > index && 'is-success is-completed', actualStep == index && 'is-active']")
      .step-marker
        span.icon
          i.fa(:class="item.icon")
      .step-details
        p.step-title {{item.title}}
        p {{item.text}}
</template>

<script>
import 'bulma-steps/dist/bulma-steps.min.css'

export default {
  props: {
    actualStep: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      menu: [{
        title: 'Shopping Cart',
        text: 'This is the first step of the process.',
        icon: 'fa-shopping-cart'
      },
      {
        title: 'Payment',
        text: 'This is the third step. One more last before the end.',
        icon: 'fa-usd'
      },
      {
        title: 'Confirmation',
        text: 'Final step. You have completed all the previous steps and end the process.',
        icon: 'fa-flag'
      }]
    }
  }
}
</script>

<style scoped lang="stylus">
  $colorGreen = #00d1b2

  .steps
    &.is-large
      font-size inherit
      margin-bottom 3rem

      .step-item .step-details .step-title
        font-size 1.2rem

    .is-active::before,
    .is-completed::before
      background-position left bottom

    .is-active .step-marker
      background-color white !important
      border-color $colorGreen !important
      color $colorGreen !important

    .is-completed .step-marker
      color white
      background-color $colorGreen
</style>
