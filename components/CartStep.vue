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
import 'bulma-steps/bulma-steps.css'

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
        title: 'User Information',
        text: 'This is the second step. You get here once you have completed the first step.',
        icon: 'fa-user'
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

<style lang="stylus">
.steps.is-large
    font-size inherit
    margin-bottom 3rem
    .step-item .step-details .step-title
      font-size 1.2rem

.steps .is-active::before,
.steps .is-completed::before
  background-position left bottom

.steps .is-active .step-marker
  background-color white !important
  border-color #00d1b2 !important
  color #00d1b2 !important

.steps .is-completed .step-marker
  color white
  background-color #00d1b2


</style>
