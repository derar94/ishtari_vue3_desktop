<template>
  <div class="has-background-ishtari" id="top-nav">
    <div class="container">
      <!-- Top Info  -->
      <div class="is-flex is-justify-content-space-between pt-1 pb-3">
        <div></div>
        <div>
          <span v-for="(icon, index) in topIcons" :key="index" class="ml-3">
            <i :class="'font-13 icon-' + icon.icon"></i>
            <span class="has-text-white ml-1 font-13">{{ icon.text }}</span>
          </span>
        </div>
      </div>

      <!-- Second Info -->
      <div
        class="pb-5 is-flex is-justify-content-space-between is-align-items-center"
      >
        <!-- Logo -->
        <router-link to="/">
          <img
          id="header-logo"
          src="@/assets/image/logo-white.png"
          alt="Ishtari.com"
        />
        </router-link>
        <!-- Search -->
        <search-bar></search-bar>
        <nav-cart></nav-cart>
      </div>
    </div>
  </div>
  <nav-menu></nav-menu>
</template>

<script>
import SearchBar from "./SearchBar";
import NavCart from "../checkout/NavCart";
import NavMenu from "./NavMenu";

export default {
  components: {
    SearchBar,
    NavCart,
    NavMenu,
  },
  data: () => {
    return {
      topIcons: [
        {
          icon: "money",
          text: "BEST DEALS",
        },
        {
          icon: "ccw",
          text: "FREE & EASY RETURNS",
        },
        {
          icon: "truck",
          text: "EXPRESS DELIVERY",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#header-logo {
  height: 33px;
}

.font-13 {
  font-size: 13px;
}
#top-nav{
  z-index: 11;
  height:100px
}
</style>
