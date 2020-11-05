<template>
  <div class="mr-5">
    <div v-for="(filter, index) in filters" :key="index">
      <filter-wrapper
        :data="filter"
        :type="index"
        v-if="filter.length > 0"
      ></filter-wrapper>
    </div>
  </div>
</template>

<script>
import FilterWrapper from "@/components/catalog/FilterWrapper";
export default {
  props: ["filters"],
  components: {
    FilterWrapper,
  },
};
</script>