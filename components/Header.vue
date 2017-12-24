<template lang="pug">
  header.navbar
    .container
      .navbar-brand
        nuxt-link.navbar-item(exact, :to="{name: 'index'}")
          strong
            i PlusGrosLeLogo
        div.navbar-burger.burger(data-target="navbarExampleTransparentExample"
                                :class="{'is-active': isBurgerMenuActive}"
                                @click="isBurgerMenuActive= !isBurgerMenuActive")
          span
          span
          span

      div#navbarExampleTransparentExample.navbar-menu(:class="{'is-active': isBurgerMenuActive}")
        .navbar-start
          .navbar-item.has-dropdown.is-hoverable
            a.navbar-link(href="/documentation/overview/start/") Products
            div.navbar-dropdown.is-boxed.is-inverted.is-success
              a.navbar-item(href="/documentation/overview/start/") Women
              a.navbar-item(href="https://bulma.io/documentation/modifiers/syntax/") Men
              hr.navbar-divider
              a.navbar-item(href="https://bulma.io/documentation/columns/basics/") Sale
          a.navbar-item(href="https://bulma.io/") Contact

        .navbar-end
          .navbar-item
            .field.is-grouped
              p.control
                a.button.is-success(target="_blank"
                                      href="https://twitter.com/")
                  span.icon
                    i.fa.fa-github
                  span Fork
              p.control
                a.button.is-success(href="https://github.com/jgthms/bulma/archive/0.5.1.zip")
                  span.icon
                    i.fa.fa-shopping-cart
</template>

<script>
export default {
  data() {
    return {
      isBurgerMenuActive: false
    }
  }
}
</script>

<style>

</style>
