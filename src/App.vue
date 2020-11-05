<template>
  <top-nav></top-nav>
  <router-view />
</template>

<script>
import TopNav from "@/components/home/TopNav";
export default {
  components: {
    TopNav,
  },
};
</script>
