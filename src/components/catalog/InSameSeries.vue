<template>
  <div class="container">
    <h2>In The Same Series</h2>
    <div class="scrollable">
      <list-product
        v-for="(product, index) in data"
        :key="index"
        :data="product"
      ></list-product>
    </div>
  </div>
</template>

<script>
import ListProduct from "@/components/catalog/ListProduct";
export default {
  props: ["data"],
  components: {
    ListProduct,
  },
};
</script>

<style  scoped>
h2 {
  font-size: 20px;
  margin: 20px 0;
  margin-top: 30px;
  font-weight: bold;
}
.scrollable > div {
  width: 15%;
  margin-right: 1%;
}
</style>