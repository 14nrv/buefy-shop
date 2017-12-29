<template lang="pug">
  .sidearea
    h4.subtitle.is-5 Only Show Sale Items
    .can-toggle.demo-rebrand-2
      input#e(type="checkbox" v-model="trigger")
      label(for="e")
        .can-toggle__switch(data-checked="Yes" data-unchecked="No")
</template>

<script>
export default {
  computed: {
    trigger: {
      get() { return this.$store.state.product.sale },
      set() { return this.$store.dispatch('product/switchSale') }
    }
  }
}
</script>
