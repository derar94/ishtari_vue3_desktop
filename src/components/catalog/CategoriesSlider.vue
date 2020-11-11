<template>
  <div :class="container ? 'container' : ''">
    <h2>{{ title || "" }}</h2>
    <div id="categoriesSlider " class="has-background-white scrollable">
      <router-link
        v-for="(category, index) in data"
        :key="index"
        class="category"
        :to="'/category/' + category.id"
      >
        <ishtari-image
          :src="category.thumb || category.image"
          :alt="category.name"
        />
        <p class="categoryName has-text-weight-bold">
          {{ parse(category.name) }}
        </p>
      </router-link>
    </div>
  </div>
</template>


<script>
import IshtariImage from "@/components/global/IshtariImage";
export default {
  components: {
    IshtariImage,
  },
  props: ["data", "title", "container"],
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
.category {
  width: 16%;
  min-width: 16%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
}
.categoryName {
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 90%;
  white-space: nowrap;
  padding-top: 5px;
}
h2 {
  font-size: 20px;
  margin: 20px 0;
  font-weight: bold;
}
.container {
  padding: 15px 0;
}
</style>