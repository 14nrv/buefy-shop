<template lang="pug">
  .container.has-text-centered
    .columns.is-vcentered
      .column.is-5
        picture.image.is-square
          source(:data-srcset="`./../products/${item.img}.webp`", type="image/webp")
          img.lazyload(:data-srcset="`./../products/${item.img}.png`", :alt="`Image of ${item.name}`")

      .column.is-6.is-offset-1
        h1.title.is-2 {{ item.name }}
        h2.subtitle.is-4 Product description, lorem ipsum dolor sit amet...
        p.is-size-6 ${{ item.price }}
        br
        p.has-text-centered
          a.button.is-medium.is-info.is-outlined(@click="addItem(item)", aria-label="Add to cart") Add to cart
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { slug } from '@/helpers'

const { mapGetters } = createNamespacedHelpers('product')

export default {
  fetch({ store, error, params }) {
    const allProducts = store.getters['product/allProducts']
    const isProductNameSameAsSlug = param =>
      allProducts.some(({ name }) => slug(name) === param.slug)

    !isProductNameSameAsSlug(params) && error({ statusCode: 404, message: 'Product not found' })
  },
  head() {
    return this.item
      ? {
          title: `${this.item.name} | ${this.$store.getters['pkg/name']}`
        }
      : false
  },
  computed: {
    ...mapGetters(['productFromSlugParamRoute']),
    item() {
      return this.productFromSlugParamRoute(this.$route.params.slug)
    }
  },
  methods: {
    addItem(item) { return this.$store.dispatch('cart/addItem', item) }
  }
}
</script>
