<template lang="pug">
  .box
    article.media
      .media-left
        picture.image.is-64x64
          source(:srcset="`products/${item.img}.webp`", type="image/webp")
          img(:src="`products/${item.img}.png`", :alt="`Image of ${item.name}`")
      .media-content
        .content
          p
            strong {{ item.name }}
            <br>
            span.itemCount {{ item.count }}
            |  x {{ item.price | usdollar }} = ${{ item.count * item.price }}
        nav.level.is-mobile
          .level-left
            a.level-item.removeItem(@click="removeItem(item)", title="Remove")
              span.icon.is-small
                i.fa.fa-trash
            a.level-item
              span.icon.is-small
                i.fa.fa-retweet
            a.level-item
              span.icon.is-small
                i.fa.fa-heart
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('cart')

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      // type: Number,
      required: true
    }
  },
  filters: {
    usdollar: function(value) {
      return `$${value}`
    }
  },
  methods: {
    ...mapActions(['removeItem'])
  }
}
</script>