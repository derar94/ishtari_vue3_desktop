<template>
  <img :src="src" :alt="alt" class="banner" />
</template>



<script>

export default {
  props: ["src", "alt"],
};
</script>