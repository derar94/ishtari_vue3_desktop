<template>
  <div id="cart-wrapper">
    <span class="has-text-white">Cart</span>
    <i class="icon-basket ml-1"></i>
    <button
      class="button has-background-ishtari-blue has-text-white"
      id="loader"
      :class="loading ? 'is-loading' : ''"
    >
      {{ loading ? "" : cartProducts.productsCount }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  mounted() {
    this.getCartProducts();
  },
  computed: {
    ...mapGetters({
      cartProducts: "cart/cartProducts",
      loading: "cart/loading",
    }),
  },
  methods: {
    ...mapActions({
      getCartProducts: "cart/getCartProducts",
    }),
  },
};
</script>
<style scoped>
i {
  font-size: 20px;
}
#cart-wrapper {
  position: relative;
}
#loader {
  border: none;
  margin: unset;
  padding: unset;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 13px;
  top: -10px;
  right: -10px;
  position: absolute;
}
</style>
