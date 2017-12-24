<template lang="pug">
  section.hero.is-success.is-fullheight
    .hero-head
      app-header
    .hero-body
      nuxt
    .hero-footer
      .container
        p Made with love from Paris
    </nav>
</template>

<script>
import AppHeader from '@/components/Header.vue'

export default {
  components: { AppHeader }
}
</script>
