<template lang="pug">
  .container
    .section
      app-hero
    .section.capsule.is-clearfix
      app-sidebar(:pricerange.sync="highprice")
      transition-group.content.is-pulled-right(name="items", tag="div")
        app-product-list-item(v-for="product in products",
                              :key="product['.key']",
                              :item="product")
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Hero from '@/components/Hero'
import ProductListItem from '@/components/ProductListItem'
import Sidebar from '@/components/Sidebar'

const { mapGetters } = createNamespacedHelpers('product')

export default {
  components: {
    AppHero: Hero,
    AppProductListItem: ProductListItem,
    AppSidebar: Sidebar
  },
  computed: {
    ...mapGetters(['products', 'highprice'])
  },
  created () {
    this.$store.dispatch('product/setProductsRef')
  }
}
</script>

<style lang="stylus" scoped>
  .content
    /*no grid support*/
    width 79.7872%
    /* grid */
    display grid
    grid-template-columns repeat(3, 1fr)
    grid-gap 1rem
    padding 0
</style>
