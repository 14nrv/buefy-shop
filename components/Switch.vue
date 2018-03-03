<template lang="pug">
  .sidearea
    .can-toggle.demo-rebrand-2.field
      input#e.switch.is-rtl(type="checkbox" name="e" v-model="trigger")
      label(for="e") Only Sale
</template>

<script>
import 'bulma-switch/dist/bulma-switch.min.css'

export default {
  computed: {
    trigger: {
      get() { return this.$store.state.product.sale },
      set() { return this.$store.dispatch('product/switchSale') }
    }
  }
}
</script>
