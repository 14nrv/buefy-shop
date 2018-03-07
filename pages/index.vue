<template lang="pug">
  div.container
    .section
      app-hero
    .section.capsule
      app-sidebar(:pricerange.sync="highprice")
      transition-group.content(name="items" tag="div")
        app-card(v-for="(item, index) in products"
          :key="index"
          :item="item"
          :index="index")
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Hero from '@/components/Hero.vue'
import Card from '@/components/Card.vue'
import Sidebar from '@/components/Sidebar.vue'

const { mapGetters } = createNamespacedHelpers('product')

export default {
  components: {
    AppHero: Hero,
    AppCard: Card,
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
    float right
    width 79.7872%
    /* grid */
    display grid
    grid-template-columns repeat(3, 1fr)
    grid-gap 10px
    padding 0 !important
</style>
