<template>
  <div id="productsWrapper">
    <list-product
      v-for="(product, index) in data"
      :key="index"
      :data="product"
    ></list-product>
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

<style scoped>
#productsWrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
#productsWrapper::after {
  /* content: ""; */
  /* flex: auto; */
}
</style>