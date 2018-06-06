<template lang="pug">
  .steps.is-large
    .step-item(v-for="(item, index) in menu",
               :key="item.name",
               :data-attr="index",
               :class="[actualStep > index && 'is-completed', actualStep == index && 'is-active']")
      .step-marker
        span.icon
          i.fa(:class="item.icon")
      .step-details(:class="[actualStep < index && 'has-text-grey-light']")
        p.step-title {{item.title}}
</template>

<script>
export default {
  name: 'StepMenu',
  props: {
    actualStep: {
      type: Number,
    },
    menu: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="stylus">
  @require '../../node_modules/bulma-steps/dist/bulma-steps.min.css'

  $colorGreen = #00d1b2
  .steps
    &.is-large
      font-size inherit
      margin-bottom 4rem

      .step-item
        .step-marker .icon *,
        .step-details .step-title
          font-size 1.2rem

    .is-active::before,
    .is-completed::before
      background-position left bottom

    .is-active .step-marker
      background-color white
      border-color $colorGreen
      color $colorGreen

    .is-completed .step-marker
      color white
      background-color $colorGreen
</style>
