<template>
  <div class="filterControl" @click="setFilters(data)">
    <i class="icon-check-empty filterControlUnchecked"></i>
    <span class="filterControlText">{{ data.name }}</span>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: ["data"],

  methods: {
    ...mapActions({
      setFilters: "catalog/setFilters",
    }),
  },
};
</script>

<style scoped>
.filterControl {
  display: flex;
  justify-self: start;
  overflow: hidden;
  align-items: center;
  transition: all 300ms ease-in;
  cursor: pointer;
}

.filterControlText:hover,
.filterControlUnchecked:hover {
  color: #3866df !important;
}

.filterControlUnchecked {
  font-size: 18px;
  color: rgb(178, 187, 210);
}

.filterControlText {
  margin-left: 5px;
  color: #404553;
  font-size: 12px;
}
</style>