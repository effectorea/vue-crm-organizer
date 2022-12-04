<template>
  <div>
    <ul class="sidenav app-sidenav" :class="{open: value}">
      <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        :to="link.url"
        active-class="active"
        :exact="link.exact"
      >
        <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  props: ['value'],
  data: () => ({
    links: [
      {title: localizeFilter('menuBill'), url: '/', exact: true},
      {title: localizeFilter('menuHistory'), url: '/history'},
      {title: localizeFilter('menuPlanning'), url: '/planning'},
      {title: localizeFilter('menuNewRecord'), url: '/record'},
      {title: localizeFilter('menuCategories'), url: '/categories'},
    ]
  })
}

</script>