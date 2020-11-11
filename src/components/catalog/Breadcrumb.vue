<template>
  <nav
    class="breadcrumb has-succeeds-separator is-marginless"
    aria-label="breadcrumbs"
  >
    <ul>
      <li><router-link class="" to="/">Home</router-link></li>
      <li v-for="bread in breadcrumbs" :key="bread.text">
        <router-link :to="{ name: bread.type, params: { id: bread.id } }">
          {{ parse(bread.text) }}</router-link
        >
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  props: ["breadcrumbs"],

  methods: {
    parse(str) {
      if (str) {
        return str
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">");
      } else {
        return "";
      }
    },
  },
};
</script>
<style scoped>
.breadcrumb {
  padding: 20px 0;
  font-size: 13px;
}
.breadcrumb li:not(.is-active) a {
  color: rgb(126, 133, 155);
}
</style>