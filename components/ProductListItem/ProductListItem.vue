<template lang="pug">
  .card.is-radius
    .card-image
      nuxt-link(exact, :to="{name: 'products-slug', params: { slug: `${slug}` } }")
        picture.image
          source(:data-srcset="`./../../products/${item.img}.webp`", type="image/webp")
          img.lazyload(:data-srcset="`./../../products/${item.img}.png`", :alt="`Image of ${item.name}`")
    .card-content
      .media
        .media-content
          nuxt-link(exact, :to="{name: 'products-slug', params: { slug: `${slug}` } }")
            p.title.is-5 {{ item.name }}
            p.item-price {{ item.price | usdollar }}
        .media-right
          p.field
            button.button.icon.is-large.add(@click="addItem(item)", aria-label="Add to cart")
              span.fa-stack
                i.fa.fa-circle.fa-stack-2x
                i.fa.fa-cart-plus.fa-stack-1x.fa-inverse
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { slug } from '@/helpers'
const { mapActions } = createNamespacedHelpers('cart')

export default {
  name: 'Card',
  filters: {
    usdollar: value => `$${value}`
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    slug() {
      return slug(this.item.name)
    }
  },
  methods: {
    ...mapActions(['addItem'])
  }
}
</script>

<style scoped lang="stylus">
  .card
    display flex
    flex-direction column
    justify-content center
    align-items center

    .image
      img
        padding-top 1.5rem

    .card-content
      width 100%

    .title,
    .subtitle
      color inherit
    .title
      margin-bottom .5rem
    .button
      border 0
      padding 0

      .fa-circle
        transition color .5s

      &:hover
        .fa-circle
          color #209cee

      &.icon
        cursor pointer

    a
      color inherit

      &:hover
        color #3273dc

  .lazyload,
  .lazyloading
    opacity 0

  .lazyloaded
    opacity 1
    transition opacity 150ms
</style>
